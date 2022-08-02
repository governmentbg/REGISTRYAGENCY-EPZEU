//TODO remove this script
var applicationConfig = {
  baseUrlName: 'http://localhost:8080/',
  epzeuApiRoot: 'https://vm-av-epzeu-ap1.dev.local:10443/Api/',
  clientLanguage: 'bg'
}
var oidcUserManagerConfig = {
  authority: 'https://vm-av-epzeu-ap1.dev.local:10443/Idsrv/',
  client_id: 'nbsoft11.client',
  redirect_uri: 'http://nb-soft11.cnsys.plc:9000/pr/Identity/SignIn.html',
  response_type: 'id_token token',
  scope: 'openid profile epzeu.pr.api',
  post_logout_redirect_uri: 'http://nb-soft11.cnsys.plc:9000/pr/',
  silent_redirect_uri: 'http://nb-soft11.cnsys.plc:9000/pr/Identity/Renew.html'
}
