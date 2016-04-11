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
    $.fn.chosenSetOrder = function(ordered_elem) {
        var select = $(this.filter('.chosen-sortable[multiple]'));
        var $options = select.chosenOrder(ordered_elem);

        select.children().remove();
        select.append($options);
        select.trigger("chosen:updated");
    };


    $.fn.chosenOrder = function(ordered_elem) {
        var $this = this.filter('.chosen-sortable[multiple]').first(),
            $chosen = $this.siblings('.chosen-container'),
            unselected = [],
            sorted;

        $this.find('option').each(function() {
            !this.selected && unselected.push(this);
        });

        if (ordered_elem) {
            sorted = $(ordered_elem.map(function(elem) {
                return $this.find('option').filter(function() { return $(this).val() == elem; })[0];
            }));
        } else {
            sorted = $($chosen.find('.chosen-choices li[class!="search-field"]').map(function() {
                if (!this && !ordered_elem) {
                    return undefined;
                }
                var text = $.trim($(this).text());
                return $this.find('option').filter(function() { return $(this).html() == text; })[0];
            }));
        }

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
                'tolerance'   : 'pointer',
                'stop'        : function() { $select.chosenSetOrder(); }
            });
        });
    };
}(jQuery));
