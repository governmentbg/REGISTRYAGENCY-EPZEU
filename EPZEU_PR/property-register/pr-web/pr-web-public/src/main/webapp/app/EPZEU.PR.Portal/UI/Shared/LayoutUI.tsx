import * as $ from "jquery";
import * as JsCookies from "js-cookie";
import * as React from "react";
import IdleTimer from 'react-idle-timer';
import { AuthenticationModes, UrlHelper, userContext } from 'Cnsys.Core';
import { AsyncUIProps, IRouterExt, withAsyncFrame, withRouter } from "Cnsys.UI.React";
import { appConfig, epzeuAuthenticationService, Language, Nomenclatures, resourceManager } from "EPZEU.Core";
import { Constants } from "EPZEU.PR.Core";
import { PageHeaderUI } from "./PageHeaderUI";

export interface LayoutUIProps extends AsyncUIProps {
  children?: React.ReactNode;
  location?: any;
  routerExt?: IRouterExt;
}

class LayoutUIImpl extends React.Component<LayoutUIProps, any> {
  constructor(props: any) {
    super(props);

    this.handleChangeLang = this.handleChangeLang.bind(this);
    this.changeLang = this.changeLang.bind(this);
    this.onIdle = this.onIdle.bind(this);
    this.onUserAction = this.onUserAction.bind(this);

    this.initHeader();
  }

  private get isUserInRole() {
    return userContext.isAuthenticated && userContext.user && (userContext.user.roles.filter(x => x === 'EP_ADM_CMS' || x === 'EP_ADM_NEWS' || x === 'EP_PREVIEW_CMS').length > 0);
  }

  componentDidMount() {
    let lang = JsCookies.get('currentLang');

    Nomenclatures.getLanguages().then(langs => {

      if (!this.isUserInRole) {
        let isCurrentLangActive = langs.filter(x => x.code == lang && x.isActive == true).length > 0;

        if (!isCurrentLangActive)
          this.changeLang("bg");
      }
    })
  }

  render() {
    return (
      <>
        <IdleTimer
          element={document}
          onIdle={this.onIdle}
          onAction={this.onUserAction}
          throttle={2000}
          timeout={appConfig.userInactivityTimeout} />
        <PageHeaderUI currentPath={this.props.location.pathname} />
        {this.props.children}
      </>);
  }

  initHeader() {
    if (userContext.isAuthenticated && userContext.user) {
      $("[nav_key='unauthenticated']").remove();
      $("[nav_key='user_email']").show();
      $("[nav_key='user_email']").text(userContext.user.email);

      if (userContext.user.authenticationMode != AuthenticationModes.UsernameAndPassword) {
        $("[nav_key='require_email_and_password_login']").remove();
      }
    }
    else {
      $("[nav_key='authenticated']").remove();
      $("[nav_key='user_email']").remove();
    }

    $("[nav_key='pr_applications']").click((event) => this.goTo(event, Constants.PATHS.APPLICATIONS));
    $("[nav_key='pr_services']").click((event) => this.goTo(event, Constants.PATHS.SERVICES));
    $("[nav_key='pr_reports']").click((event) => this.goTo(event, Constants.PATHS.REPORTS));

    var that = this;

    this.props.registerAsyncOperation(Nomenclatures.getLanguages().then((langs) => {
      let langAnchors: any[] = [];
      let activeLangs = langs.filter(x => x.isActive === true);

      this.addLangsToContainer(activeLangs, langAnchors)

      if (that.isUserInRole) {
        langAnchors.push("<div class=\"dropdown-divider\"></div>");
        this.addLangsToContainer(langs.filter(x => x.isActive === false), langAnchors);
      }

      $('div.dropdown-menu--scrollable').html("").append(langAnchors);
      $("[nav_key='lang']").click(that.handleChangeLang)
    }));

    $("[nav_key='title']").text(resourceManager.getResourceByKey("GL_PR_REG_NAME_L"));

    $("[nav_key='login']")
      .attr('href', 'javascript://')
      .click(this.signIn);

    $("[nav_key='logout']")
      .attr('href', 'javascript://')
      .click(this.signOut);
  }

  goTo(event: any, path: string) {
    event.preventDefault();

    //заваряме подменюто с навигацията
    var winTmp: any = window;
    winTmp.toggleSubnav();

    this.props.routerExt.goTo(path, null);
  }

  addLangsToContainer(langs: Language[], container: any[]) {
    for (var i = 0; i < langs.length; i++) {
      container.push($('<a/>', {
        class: "dropdown-item",
        text: `${langs[i].code} - ${langs[i].name}`,
        nav_value: langs[i].code,
        nav_key: "lang",
        href: 'javascript://',
      }));
    }
  }

  handleChangeLang(event: any) {
    event.preventDefault();

    let lang = event.target.attributes.nav_value.value;

    this.changeLang(lang);
  }

  changeLang(lang: string) {

    if (lang != appConfig.clientLanguage) {
      JsCookies.set("currentLang", lang, { path: "/", expires: new Date(2033, 12), domain: `${appConfig.commonCookieDomain}` });

      let currentPath = this.props.location.pathname + this.props.location.search;
      let url: string = null;

      if (lang == "bg")
        url = UrlHelper.generateContentUrl(`~${currentPath}`);
      else
        url = UrlHelper.generateContentUrl(`~/${lang}${currentPath}`);

      window.location.replace(url);
    }
  }

  signIn(event: any) {
    event.preventDefault();
    epzeuAuthenticationService.SigninRedirect();
  }

  signOut(event: any) {
    event.preventDefault();
    epzeuAuthenticationService.SignoutRedirect();
  }

  onIdle(e: any) {


    let timeout: number = appConfig.userInactivityTimeout;

    this.props.registerAsyncOperation(epzeuAuthenticationService.getUser().then(u => {

      if (u == null)
        return Promise.resolve();

      let lastActiveTime: string = JsCookies.get("usr_active_timestamp");

      if (lastActiveTime == null || lastActiveTime == "")
        return Promise.resolve();

      let lastActiveTimestampN: number = parseInt(lastActiveTime);

      if ((Date.now() - lastActiveTimestampN) < timeout)
        return Promise.resolve();

      return epzeuAuthenticationService.SignoutRedirectForIdleUser(UrlHelper.generateLinkUrl(`~${Constants.PATHS.SESSION_TIMEOUT}`));
    }));
  }

  onUserAction(e: any) {
    JsCookies.set("usr_active_timestamp", Date.now().toString(), { path: "/", domain: `${appConfig.commonCookieDomain}` });
  }
}

export const LayoutUI = withRouter(withAsyncFrame(LayoutUIImpl));
