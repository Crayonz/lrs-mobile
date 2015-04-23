// Basket popup

$(function() {
	var basket = $('header .frame .basket'),
		closeButton = $('.basket-popup .close'),
		popup = $('.basket-popup'),
		dropBox = $('header nav .drop-box > ul'),
		dropBoxItem = dropBox.children('li');
	basket.click(function(){
		basketPopup(popup);
	});
	
	closeButton.click(function(){
		closePopup(popup);
	});
	
	dropBoxItem.hover(function(){
		var subMenu = $(this).find('.sub-menu'),
			subHeight = subMenu.innerHeight(true),
			arrow = $(this).children('a').find('span.arrow');
		$(this).css('padding-bottom',subHeight);
		if(subMenu.length != 0){
			arrow.show();
		};
	},
	function(){
		var arrow = $(this).children('a').find('span.arrow');
		$(this).css('padding-bottom','0px');
		arrow.hide();
	});
	
	tabsInit();
	
	//$('header .select').selectik({ maxItems: 99});
})

function basketPopup(box){
	box.fadeIn(400);
	setTimeout(function(){
		closePopup(box);
	},3000);
};

function closePopup(elem){
	elem.fadeOut(400);
};

// Tabs

function tabsInit(){
	var _divs=$('.tab-container > div.slider');

	$($('.tabs ul.tab-list li.active a.opener').attr("href")).show();

		$('.tabs ul.tab-list li').click(function(){
			
			var link = $(this).find('a.opener');
			$(this).parent().parent().find(_divs).hide();
			$(this).siblings().each(function(){
				$(this).removeClass('active');
			});
			$(link.attr("href")).show();
			$(this).addClass('active');
			return false;
		});
};

// Sidebar Accordian nav

$(function() {
	$('#menu li.active > ul').slideDown();
	$('#menu > li > a').click(function(){
		var slideList = $(this).parent().find('ul');
		$(this).parent().siblings().each(function(){
			$(this).parent().find('ul').slideUp();
			$(this).parent().removeClass('active');
		});
		slideList.slideDown();
		$(this).parent().addClass('active');
		return false;
	});
/*
	$('header .select').selectik({ maxItems: 10});
	$('.product-item .select').selectik({ maxItems: 10});

 */
	var sortForm = $('form.sort-form'),
		customSelect = sortForm.find('.custom-select').eq(1);
	customSelect.addClass('small-select');
});

// Tooltip

$(function() {
	var opener = $('.options-box .row a.popup-open'),
		box = $('.options-box .row .tooltip');
	opener.click(function(e){
		e.stopPropagation();
		var tooltip = $(this).siblings('.tooltip');
		tooltip.fadeIn(500);
		closeTooltip(tooltip);
	});
	
	$('html').click(function() {
		box.fadeOut(500);
	});
	
	box.click(function(event){
		event.stopPropagation();
	});
	
	function closeTooltip(elem){
		setTimeout(function(){
			elem.fadeOut(500);
		},8000);
	};
});

// Basket & Checkout

$(document).ready(function(){
	$('#basket-form input, #basket-form select').change(function(){
		$('#proceedToCheckout').hide();
		$('#updateQuantityShipping').show();
	});
	$('#basket-form input').keypress(function(){
		$('#proceedToCheckout').hide();
		$('#updateQuantityShipping').show();
	});
});

// Gallery

$(document).ready(function(){
	$('.slideshow').cycle({ 
		fx: 'fade', 
		speed: 'slow',
		timeout: 0,
		pager: '.slideshow-nav', 
		pagerAnchorBuilder: function(idx, slide) { 
			// return selector string for existing anchor 
			return '.slideshow-nav li:eq(' + idx + ') a'; 
			} 
		});
});

// Payment options

$(document).ready(function(){
   $('#payment_method_options a').click(function(){

        $('input[name=\'payment_method\']').val($(this).attr('id').replace('pm_', ''));
   })

});


// Hide invoice address when ticked
$(document).ready(function(){
    $('#invoice_is_delivery_addr').click(function(){
        if ($(this).is(':checked')){
            $(this).parent().siblings().filter(':first').hide();
        } else {
            $(this).parent().siblings().filter(':first').show();
        }
    });
});

// "Use this address
$(document).ready(function(){
    $('.saved_addresses a').click(function(){
        var evtBtn = $(this);
        var addrtype = $(this).parent().data('addr-type');
        var re = new RegExp(addrtype + '$');

        // Loop over all the details form for this type of address
        // If data is set for the address type in the clicked address then use that value else use blank

        $('#details-form *').filter(':input').filter(function(){

            return re.test(this.name) || (addrtype == 'delivery' && this.name == 'or_customer_contact_telephone_number');

        }).each(function(){
            var currField = $(this);

            $(this).val(function(){

                var evtBtnField = evtBtn.prev('address').children('span').filter(function(){
                   return $(this).data('mapping') == currField.attr('name').replace(re, '');
                });

                if (evtBtnField){
                    return evtBtnField.text();
                } else {
                    return '';
                }
            });
        });

        return false;
    });
});

// Show / hide options in basket
$(document).ready(function(){
   $('#showDeliveryOptions').click(function(){
       $('#extra_options_box,#hideDeliveryOptions').css({'display' : ''});
       $('#showDeliveryOptions').css({'display' : 'none'});
       return false;
   });

    $('#hideDeliveryOptions').click(function(){
        $('#extra_options_box,#hideDeliveryOptions').css({'display' : 'none'});
        $('#showDeliveryOptions').css({'display' : ''});
        return false;
    });
});


// Select category conditions
$(document).ready(function(){
    $('.listing-select').change(function(){
        var sel = $(this);
        var selOpt = sel.find(':selected').first();

        if (selOpt.data('price-ex') == 'POA')
        {
            sel.next().html('<span class="price">POA</span>');
        }
        else
        {
            sel.next().html('<span class="price">&pound;' + selOpt.data('price-ex') + '</span> (ex. VAT)');
        }

        sel.parent().find('input[name=\'condition_id\']').val(selOpt.data('condition-id'));
    });
});
