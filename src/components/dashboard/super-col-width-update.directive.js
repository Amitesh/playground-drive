"use strict";

export default function superColWidthUpdateDirective($timeout) {
    'ngInject';

    return {
        'restrict': 'A',
        'link': function (scope, element) {
            var _colId = scope.col.colDef.superCol,
                _el = jQuery(element);
            _el.on('resize', function () {
                console.log('calling resize...');
                _updateSuperColWidth();
            });

            $(window).on('resize', function () {
                console.log('calling resize...');
                _updateSuperColWidth();
            });

            var _updateSuperColWidth = function () {
                console.log('hahaha...')


                $timeout(function () {
                    var _parentCol = jQuery('.ui-grid-header-cell[col-name="' + _colId + '"]');
                    var _parentWidth = _parentCol.outerWidth(),
                        _width = _el.outerWidth();

                    var w = 0;
                    var cols = jQuery('div[super-col-group="' + _colId + '"]');
                    cols.each(function (el) {
                        w = w + jQuery(this).outerWidth();
                    });
                    _parentWidth = w;

                    // if (_parentWidth + 1 >= _width) {
                    //     _parentWidth = _parentWidth + _width;
                    // } else {
                    //     _parentWidth = _width;
                    // }

                    _parentCol.css({
                        'min-width': _parentWidth + 'px',
                        'max-width': _parentWidth + 'px',
                        'text-align': "center"
                    });

                    jQuery('.ui-grid-header-canvas').css({'width': ''});

                    _updateGridHeight();
                }, 0);
            };

            //TODO : need to pull in another directive
            var _updateGridHeight = function () {
                var gh = 0; // grid height
                var rh = 0; // row height

                jQuery('.ui-grid-header, .ui-grid-row').each(function (i, o) {
                    o = $(o);
                    
                    gh += o.height();

                    if (o.hasClass('ui-grid-row')) {
                        rh += o.height();
                    }
                    // console.log('offset =>', o.height());
                });
                // console.log(gh, rh);

                jQuery('.ui-grid').height(gh);
                jQuery('.ui-grid-canvas').height(rh);

            };
            _updateSuperColWidth();
        }
    };
}