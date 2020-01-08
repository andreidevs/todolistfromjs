
//AUTOCOMPLITE
  $(document).ready(function(){
    $('input.autocomplete').autocomplete({
      data: {
        "Apple": null,
        "Microsoft": null,
        "Google": 'https://placehold.it/250x250'
        
      },
    });
  });


//COUNTER TEXTAREA
$(document).ready(function() {
    $('input#input_text, textarea#autocomplete-input').characterCounter();
  });

