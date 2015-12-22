/*
 * Author: Yves Van Broekhoven & Simon Menke
 * Created at: 2012-07-05
 *
 * Requirements:
 * - jQuery
 * - jQuery UI
 * - Chosen
 *
 * Version: 1.0.0
 */
(function($) {

    $.fn.chosenOrder = function() {
        var $this   = this.filter('.chosen-sortable[multiple]').first(),
            $chosen = $this.siblings('.chosen-container'),
            unselected = [],
            sorted;

        $this.find('option').each(function() {
            !this.selected && unselected.push(this);
        });

        sorted = $($chosen.find('.chosen-choices li[class!="search-field"]').map(function() {
            if (!this) {
                return undefined;
            }
            var text = $.trim($(this).text());
            return $this.find('option').filter(function() { return $(this).html() == text; })[0];
        }));

        sorted.push.apply(sorted, unselected);
        return sorted;
    };


    /*
     * Extend jQuery
     */
    $.fn.chosenSortable = function(){
        var $this = this.filter('.chosen-sortable[multiple]');

        $this.each(function(){
            var $select = $(this);
            var $chosen = $select.siblings('.chosen-container');

            // On mousedown of choice element,
            // we don't want to display the dropdown list
            $chosen.find('.chosen-choices').bind('mousedown', function(event){
                if ($(event.target).is('span')) {
                    event.stopPropagation();
                }
            });

            // Initialize jQuery UI Sortable
            $chosen.find('.chosen-choices').sortable({
                'placeholder' : 'ui-state-highlight',
                'items'       : 'li:not(.search-field)',
                //'update'      : _update,
                'tolerance'   : 'pointer'
            });

            // Intercept form submit & order the chosens
            $select.closest('form').on('submit', function(){
                var $options = $select.chosenOrder();
                $select.children().remove();
                $select.append($options);
                $select.trigger("chosen:updated");
            });

        });

    };
}(jQuery));
