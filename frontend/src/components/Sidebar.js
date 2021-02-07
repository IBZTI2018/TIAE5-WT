import $ from 'jquery';

function loadLogic() {
    var bsDefaults = {
        offset: false,
        overlay: true,
        width: '330px'
    },
        bsMain = $('.bs-offset-main'),
        bsOverlay = $('.bs-canvas-overlay');

    $('[data-toggle="canvas"][aria-expanded="false"]').on('click', function () {
        var canvas = $(this).data('target'),
            opts = $.extend({}, bsDefaults, $(canvas).data()),
            prop = $(canvas).hasClass('bs-canvas-right') ? 'margin-right' : 'margin-left';

        if (opts.width === '100%')
            opts.offset = false;

        $(canvas).css('width', opts.width);
        if (opts.offset && bsMain.length)
            bsMain.css(prop, opts.width);

        $(canvas + ' .bs-canvas-close').attr('aria-expanded', "true");
        $('[data-toggle="canvas"][data-target="' + canvas + '"]').attr('aria-expanded', "true");
        if (opts.overlay && bsOverlay.length)
            bsOverlay.addClass('show');
        return false;
    });

    $('.bs-canvas-close, .bs-canvas-overlay').on('click', function () {
        var canvas, aria;
        if ($(this).hasClass('bs-canvas-close')) {
            canvas = $(this).closest('.bs-canvas');
            aria = $(this).add($('[data-toggle="canvas"][data-target="#' + canvas.attr('id') + '"]'));
            if (bsMain.length)
                bsMain.css(($(canvas).hasClass('bs-canvas-right') ? 'margin-right' : 'margin-left'), '');
        } else {
            canvas = $('.bs-canvas');
            aria = $('.bs-canvas-close, [data-toggle="canvas"]');
            if (bsMain.length)
                bsMain.css({
                    'margin-left': '',
                    'margin-right': ''
                });
        }
        canvas.css('width', '');
        aria.attr('aria-expanded', "false");
        if (bsOverlay.length)
            bsOverlay.removeClass('show');
        return false;
    });
}

function SidebarOverlay() {
    document.addEventListener("DOMContentLoaded", () => {
        loadLogic()
    });

    return (
        <div>
            <div className="bs-canvas-overlay bs-canvas-anim bg-dark position-fixed w-100 h-100"></div>
            <div id="bs-canvas-right" className="bs-canvas bs-canvas-anim bs-canvas-right position-fixed bg-light h-100">
                <header className="bs-canvas-header p-3 bg-primary overflow-auto">
                    <button type="button" className="bs-canvas-close float-left close" aria-label="Close"><span
                        aria-hidden="true" className="text-light">&times;</span></button>
                    <h4 className="d-inline-block text-light mb-0 float-right">Account</h4>
                </header>
                <div className="bs-canvas-content px-3 py-5">
                    <a href="/user" >My Account</a>
                </div>
                <div className="bs-canvas-content px-3 py-5">
                    <a href="/reservation" >Reservation overview</a>
                </div>
            </div>
        </div>
    );
}

function SidebarPanel() {
    return (
        <div id="bs-canvas-right" className="bs-canvas bs-canvas-anim bs-canvas-right position-fixed bg-light h-100">
            <header className="bs-canvas-header p-3 bg-primary overflow-auto">
                <button type="button" className="bs-canvas-close float-left close" aria-label="Close"><span
                        aria-hidden="true" className="text-light">&times;</span></button>
                <h4 className="d-inline-block text-light mb-0 float-right">Account</h4>
            </header>
            <div className="bs-canvas-content px-3 py-5">
                ...
            </div>
        </div>
    );
}

export { SidebarOverlay, SidebarPanel };
