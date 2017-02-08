// climate changer
$(document).on('change', '#climate-switcher', function(){
	$('#grid-container').attr('climate-type', $(this).val())
});

// hex manipulating
function cloneRow(){
	$('.grid-row.clone-row').clone().removeClass('clone-row').appendTo('#grid-container');
	hexNumbering();
}
function deleteRow(){
	$('#grid-container .grid-row:last-child').remove();
}

// hex selector
$(document).on('click', 'li.hex', function(){
	$(this).toggleClass('selected');
});

// terraforming
function cleanTexture(){
	$('.selected').removeAttr('surface-type');
	resetSelect();
}

function manipulating(action, data){
	$('.selected').attr(action, data);
	resetSelect();
}

$(document).on('click', '.btn.terraforming', function(){
	manipulating('surface-type', $(this).attr("data-value"));
})

function resetSelect(){
	$('.selected').removeClass('selected')
}

// building
function clearArea(){
	$('.selected').children('.structure').remove();
}

function cleanAreaHex(){
	clearArea();
	resetSelect();
}

$(document).on('click', '.btn.structure', function(){
	clearArea();
	var building = $(this).attr("data-value");
	$('.selected').append('<div class="structure" data-type="' + building + '"></div>')
	resetSelect();
});

// Altitude display
function setAltitude(){
	$('li.hex').each(function(){
		var span = $(this).children('span.alt');
		var alt = span.attr('data-alt');
		span.text(alt);
	})
}

// Numbering
function hexNumbering(){

	var gridRow = $('.grid-row'),
		sumRows = gridRow.length,
		hex = $('li.hex'),
		sum = hex.length;

	for (var i = 1; i <= sumRows; i++) {
		$('.grid-row:nth-child(' + i + ')').attr('row-number', i)
		var curentRow = $('.grid-row:nth-child(' + i + ')').attr('row-number')
	}

	for (var i = 1; i <= sumRows; i++) {
		if (i < 10) {
			outPut( '0' + $('.grid-row:nth-child(' + i + ')').attr('row-number'), i);

		} else {
			outPut($('.grid-row:nth-child(' + i + ')').attr('row-number'), i);
		}
	}

	function outPut(a, b){
		for (var i = 0; i < sum; i++){
		if(i < 10) {
			$('.grid-row:nth-child(' + b + ') li.hex:nth-child(' + i +')').children('.index').text(a + '0' + i);
		} else {
			$('.grid-row:nth-child(' + b + ') li.hex:nth-child(' + i +')').children('.index').text(a + i);
		}
		};
	};

	// adds id to hex
	$('li.hex').each(function(){
		$(this).attr('id', $(this).children('span.index').text())
	});
}

// UI - checkbox
$(document).on('change', 'input[type=checkbox]', function(){

	var name = $(this).attr('name');

	if ($(this).is(':checked')){
		$('span.' + name).show();
	} else {
		$('span.' + name).hide();
	}

	switch(name) {
		case 'alt':
			setAltitude();
			break;
		case 'index':
			hexNumbering();
			break;
	}
});

