export function setCurrentOptionInNavMenu(navKey: string): void {
    let options = $('#cr-navbar-top-subnav li [nav_key]');

    if (options && options.length > 0) {
        options.each(function (index: number, element: HTMLElement) {
            $(element).removeClass('active');

            if ($(element).attr('nav_key') === navKey) {
                $(element).addClass('active');
            }
        });
    }
}