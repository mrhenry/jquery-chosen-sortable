/*
 * Author: Yves Van Broekhoven & Simon Menke
 * Created at: 2012-07-05
 *
 * Requirements:
 * - jQuery
 * - jQuery UI
 * - Chosen
 *
 * Version: 0.0.1
 */
(function($) {

  var _update;

  /*
   * On sort update
   * this = ul.chzn-choices
   */
  _update = function() {
    var $this         = $(this),
        $select       = $this.closest('.chzn-container').siblings('select'),
        $options      = $('option', $select),
        $select_clone = $select.clone(),
        $drop_results = $this.closest('.chzn-container').find('.chzn-drop .chzn-results');
        $drop_results_clone = $drop_results.clone();

    $select_clone.children().not(':eq(0)').remove();
    $drop_results_clone.children().remove();

    var i = 1;
    $this.find('li[class!="search-field"]').each(function() {
      $(this).attr('id', $select.attr('id') + '_chzn_c_' + i);

      var $option = $options.filter(':contains(' + $(this).text() + ')');
      $option.appendTo($select_clone);
      i++;
    });

    $options.not(':selected').not(':eq(0)').each(function() {
      $(this).appendTo($select_clone);
    })

    $select.replaceWith($select_clone);

    $select_clone.find('option').each(function(){ console.log($(this).text())});
    console.log("---");
    $select_clone.find('option').not(':eq(0)').each(function(idx) {
      var $li = $drop_results.find('li:contains(' + $(this).text() + ')');
      $li.attr( 'id', $select.attr('id') + '_chzn_o_' + (idx + 1) );
      $li.appendTo($drop_results_clone);
    });

    $drop_results.replaceWith($drop_results_clone);

    console.info('List sorted');
  };


  /*
   * Extend jQuery
   */
  $.fn.chosenSortable = function(){
    $this = this.filter('.chzn-sortable');

    $this.each(function(){
      $select = $(this);
      $chosen = $select.siblings('.chzn-container');

      // On mousedown of choice element,
      // we don't want to display the dropdown list
      $chosen.find('.chzn-choices').bind('mousedown', function(event){
        if ($(event.target).is('span')) {
          event.stopPropagation();
        }
      });

      // Initialize jQuery UI Sortable
      $chosen.find('.chzn-choices').sortable({
        'placeholder' : 'ui-state-highlight',
        'items'       : 'li:not(.search-field)',
        'update'      : _update,
        'tolerance'   : 'pointer'
      });

    });

  };

}(jQuery));