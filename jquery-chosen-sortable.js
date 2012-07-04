/*
 * Author: Yves Van Broekhoven & Simon Menke
 * Created at: 2012-03-16
 *
 * Requirements:
 * - jQuery
 * - jQuery UI
 * - Chosen
 *
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
        $options      = $('option', $form_field),
        $select_clone = $form_field.clone();
    
    $select_clone.children().remove();
    
    $this.find('li[class!="search-field"]').each(function() {
      //var result = new RegExp(/chzn_c_(\d*)/).exec($(this).attr('id'));
      //if (result[1]) {
      //  var $option = $options.eq(parseInt(result[1], 10));
      //  $option.appendTo($clone);
      //} else {
      //  try {
      //    console.warn('Cannot create index from ' + $(this).attr('id'));
      //  } catch(e) {}
      //}
      
      //  var $option = $options.filter('option[value="' + $(this).attr('rel') + '"]');
      //    $clone.append($option);
    });
    
    $options.not(':selected').appendTo($select_clone);
    
    $form_field.replaceWith($select_clone);
    
    //$(this).find('li[class!="search-field"]').each(function(idx){
    //  var result = new RegExp(/chzn_c_(\d*)/).exec($(this).attr('id'));
    //  console.log(result);
    //});

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