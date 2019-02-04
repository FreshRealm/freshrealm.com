var ReportActions = {};

/*ReportActions.recaptchaKey = "";

ReportActions.recaptchaExists = false;

ReportActions.initRecaptcha = function(form) {
	var formName = form.attr('name');
	var reportId = formName.replace('report_', '');
	var recaptchaContainer = $('#report_captcha_'+reportId);
	var recaptchaPanel = recaptchaContainer.closest('.report_captcha_panel');
	
	if (recaptchaContainer.is('div')) {
		if (ReportActions.recaptchaExists == false) {
			Recaptcha.create(ReportActions.recaptchaKey, "report_captcha_"+reportId, RecaptchaOptions);
			ReportActions.recaptchaExists = formName;
			recaptchaPanel.show();
		} else if (ReportActions.recaptchaExists != formName) {
			$('.report_captcha_panel').hide();
			Recaptcha.destroy();
			
			Recaptcha.create(ReportActions.recaptchaKey, "report_captcha_"+reportId, RecaptchaOptions);
			ReportActions.recaptchaExists = formName;
			recaptchaPanel.show();
		}
	}
};*/

ReportActions.checkOptInCheckbox = function(form, obj) {
	var id = $(obj).attr('id');
	
	if ($(obj).attr('checked'))
		$("#"+id+"_optInList", form).show();
	else
		$("#"+id+"_optInList", form).hide();
};

ReportActions.checkTributeGift = function(form) {
	// if checked 
	if ($("#ReportsResponsesPaymentTributeGift", form).get(0).checked == true){
		$(".tribute-data", form).show();
	} else {
		$(".tribute-data", form).hide();

		$("#honor_by_email_1", form).prop("checked", true);
		$("#honor_by_email_0", form).prop("checked", false);

		ReportActions.checkAcknowledgement(form);
	}
};

ReportActions.checkAcknowledgement = function(form) {
	// if checked
	if ($("#honor_by_email_0", form).get(0).checked == true){
		$(".postal-acknowledgement", form).show();
	} else {
		$(".postal-acknowledgement", form).hide();
	}

	if ($("#honor_by_email_1", form).get(0).checked == true){
		$(".email-acknowledgement", form).show();
	} else {
		$(".email-acknowledgement", form).hide();
	}
};
ReportActions.checkSeqb = function(form) {
	// if checked
	if ($("#ReportsResponsesPaymentSeqb", form).get(0).checked == true){
		$(".shipping-data", form).hide();
	} else {
		$(".shipping-data", form).show();
	}
};

ReportActions.initFileuploader = function(obj) {
	var reportFileUploader = $(obj);

	reportFileUploader.fileupload({
		url: '/report/upload',
		dataType: 'json',
		formData: {},
		dropZone: reportFileUploader,
		pasteZone: reportFileUploader,
		start: function (e, data) {
			var p = $(this).closest('.form-group');
			p.removeClass('has-error');
			$(".help-block", p).remove();
			$('.progress', $(this).closest('.report-fileupload-panel')).show();
		},
		done: function (e, data) {
			var p = $(this).closest('.report-fileupload-panel');
			var prefix = $(this).attr('id');
			  
			
			if (typeof data.result.error != 'undefined') {
				$('.report-fileupload-result', p).html($('<p/>').text(data.result.error+' - '+data.result.name).addClass("text-has-error"));
			} else{
				$('input[id$=_name]', p).val(data.result.name);
				$('input[id$=_tmp_name]', p).val(data.result.tmp_name);
				
				$('.report-fileupload-result', p).html(
					'<div style="margin: 0 0 10px 0px;">'+ data.result.name +'</div>'+
					'<div style="margin: 0 0 10px 0px;">'+
						'<button type="button" class="btn btn-danger delete">'+
							'<i class="glyphicon glyphicon-trash glyphicon glyphicon-white"></i>'+
							'<span>Delete</span>'+
						'</button>'+
					'<\/div>');
				
				$('.report-fileupload-result .btn.delete', p).click(function(){
					ReportActions.deleteUploadedFile(this);
				});
			}
			$('.report-fileupload-result', p).show();
			$('.progress', p).hide();
		},
		progressall: function (e, data) {
			var p = $(this).closest('.report-fileupload-panel');
			var progress = parseInt(data.loaded / data.total * 100, 10);
			$('.progress .bar', p).css(
				'width',
				progress + '%'
			);
		}
	});
}

ReportActions.deleteUploadedFile = function(obj) {
	bootbox.confirm('Are you sure?', function(result) {
		if (result){
			var p = $(obj).closest('.report-fileupload-panel');
			$('input[id$=_name]', p).val('');
			$('input[id$=_tmp_name]', p).val('');
			$('.report-fileupload-result', p).html('').hide();
			$('.progress', p).hide();
			$('.progress .bar', p).css('width','0%');
		}
	});
	return false;
}

ReportActions.documentReady = function() {
	//Date pickers init
	$('.report-form-date-pick').datepicker({
		showOtherMonths: true,
		selectOtherMonths: true,
		changeMonth: true,
		changeYear: true,
		dateFormat: "yy-mm-dd"
	});
	
	/*$('.report-panel form').find('*').focus(function(){
		ReportActions.initRecaptcha($(this).closest('form'));
	});*/
	
	$(".report-panel form").each(function(){
		var form = $(this);
		
		/*if ($(".report_captcha_panel .form-group", form).is('.has-error')){
			ReportActions.initRecaptcha(form);
		}*/
		
		$(".opt_in_checkbox", form).each(function(i){
			ReportActions.checkOptInCheckbox(form, this);
		});
		
		$(".opt_in_checkbox", form).click(function(){
			ReportActions.checkOptInCheckbox(form, this);
		});
		
		if ($("#ReportAgree", form).is("input")) {
			$("#ReportAgree", form).click(function(){
				if ($(this).prop('checked')) {
					$(".report-submit", form).removeAttr('disabled');
				} else {
					$(".report-submit", form).attr('disabled', 'disabled');
				}
			});
		}

		// check status 'tribute_gift' ('Check here to donate in honor or memory of someone') checkbox
		if ($("#ReportsResponsesPaymentTributeGift", form).is("input")) {
			$("#ReportsResponsesPaymentTributeGift", form).click(function(){
				ReportActions.checkTributeGift(form);
			});
			ReportActions.checkTributeGift(form);
		}

		if ($("#honor_by_email_0,#honor_by_email_1", form).is("input")) {
			$("#honor_by_email_0,#honor_by_email_1", form).click(function(){
				ReportActions.checkAcknowledgement(form);
			});
			ReportActions.checkAcknowledgement(form);
		}

		// check status 'shipping eq billling' checkbox 
		if ($("#ReportsResponsesPaymentSeqb", form).is("input")) {
			$("#ReportsResponsesPaymentSeqb", form).click(function(){
				ReportActions.checkSeqb(form);
			});
			ReportActions.checkSeqb(form);
		}
	});
};