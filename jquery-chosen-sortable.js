/*
 * Author: Yves Van Broekhoven & Simon Menke
 * Created at: 2012-03-16
 */
(function($){

  var _update;

  /*
   * On sort update
   * @context ul.chzn-choices
   */
  _update = function(){
    $form_field     = $(this).closest('.chzn-container').siblings('select');
    $options        = $('option', $form_field);
    $clone          = $form_field.clone();
    
    $clone.children().remove();
    
    $(this).find('li[class!="search-field"]').each(function(){
      var result = new RegExp(/chzn_c_(\d*)/).exec($(this).attr('id'));
      if (result[1]) {
        var $option = $options.eq(parseInt(result[1], 10));
        $option.appendTo($clone);
      } else {
        console.warn('Cannot create index from ' + $(this).attr('id'));
      }
    //  var $option = $options.filter('option[value="' + $(this).attr('rel') + '"]');
    //    $clone.append($option);
    });
    
    $options.not(':selected').appendTo($clone);
    
    $form_field.replaceWith($clone);

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
        'placeholder' : 'ui-state-highlight'
      , 'items'       : 'li:not(.search-field)'
      , 'update'      : _update
      , 'tolerance'   : 'pointer'
      });

    });

  };

}(jQuery));