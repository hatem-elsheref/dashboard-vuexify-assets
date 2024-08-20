
function isRtl(){
    return document.querySelector("meta[name='locale']").getAttribute("content") === 'ar';
}
function validate(formIdentifier, rules) {

    let validationMessages = {
        'ar': {
            required: "مطلوب.",
            remote: "يرجى تصحيح هذا الحقل.",
            email: "يجب أن يكون عنوان بريد إلكتروني صالح.",
            url: "يجب أن يكون عنوان URL صالح.",
            date: "يجب أن يكون تاريخ صالح.",
            dateISO: "يجب أن يكون تاريخ صالح (ISO).",
            number: "يجب أن يكون رقمًا صالحًا.",
            digits: "يجب أن يحتوي على أرقام فقط.",
            creditcard: "يجب أن يكون رقم بطاقة ائتمان صالح.",
            equalTo: "يجب أن يكون مساويًا لـ {0}.",
            accept: "{0} يجب أن يحتوي على امتداد صالح.",
            maxlength: "يجب ألا يتجاوز {0} حرفًا.",
            minlength: "يجب أن لا يقل عن {0} حرفًا.",
            rangelength: "يجب أن يكون بين {0} و {1} حرفًا.",
            range: "{1} يجب أن يكون بين {0} و.",
            max: "{0} يجب أن يكون أقل من أو يساوي.",
            min: "يجب أن يكون أكبر من أو يساوي {0}."
        },
        'en': {
            required: "This field is required.",
            remote: "Please correct this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            accept: "Please enter a value with a valid extension.",
            maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
            minlength: jQuery.validator.format("Please enter at least {0} characters."),
            rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
            range: jQuery.validator.format("Please enter a value between {0} and {1}."),
            max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
            min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
        }
    }

    let locale = document.querySelector("meta[name='locale']").getAttribute("content");

    $.extend($.validator.messages, validationMessages[locale]);

    let form = $(formIdentifier);

    if (form.length) {
        form.validate({
            errorElement: "small",
            rules: rules,
            submitHandler: function(form) {
                form.submit();
            }
        });
    }
}

function preview(event){
    let file = event.files[0];
    let reader = new FileReader();
    reader.onload = function (){
        document.getElementById('blog-feature-image').src = reader.result
        document.getElementById('blog-image-text').innerHTML = file.name
    }
    reader.readAsDataURL(file)
}
function preview2(event, id){
    let file = event.files[0];
    let reader = new FileReader();
    reader.onload = function (){
        document.getElementById('blog-feature-image' + id).src = reader.result
        document.getElementById('blog-image-text' + id).innerHTML = file.name
    }
    reader.readAsDataURL(file)
}

async function callApi(method = 'get', $url, $params = undefined, headers = {}){


  let configurations = {
    method: method.toUpperCase(),
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": document.querySelector("meta[name='csrf']").getAttribute("content"),
      "Content-Type": "application/json",
      ...headers},
  };

  if (method.toUpperCase() !== 'GET'){
      $params = {};
      $params._method = method;
      configurations.body = JSON.stringify($params);
  }

  let response =  await fetch($url, configurations);

  return response.json();
}

function copyToClipboard(selector) {
    var userText = $(selector).html();
    let tempTextarea = document.createElement('textarea');
    tempTextarea.value = userText;

    document.body.appendChild(tempTextarea);
    tempTextarea.select();

    navigator.clipboard.writeText(tempTextarea.value)
        .then(() => {
            success('Copied to clipboard!')
        })
        .catch(err => {
            // Handle any errors that occur during the copying process
            console.error('Failed to copy text: ', err);
        });

    document.body.removeChild(tempTextarea);

}
function notify(message = '', duration = 9000, position = 'right', gravity = 'bottom') {
  Toastify({
    duration: duration,
    gravity: gravity,//top
    position: position,//left
    text: message,
    className: "info",
    style: {
      // background: "linear-gradient(to right, #00b09b, #96c93d)",
      background: "linear-gradient(to right, rgb(206 102 27), #ba1718)",
    }

  }).showToast();
}


function success(message) {
  toastr.success(message, isRtl() ? 'نجحت العملية' : 'Success', { closeButton: 0, tapToDismiss: !1, progressBar: !0, rtl: isRtl() });
}

function error(message) {
  toastr.error(message, isRtl() ? 'فشلت العملية' : 'Error', { closeButton: 0, tapToDismiss: !1, progressBar: !0, rtl: isRtl() });
}

function confirmChangeItemStatus(event){
    Swal.fire({
        title: isRtl() ? 'هل انت متأكد من  ذلك ؟ّ' : 'Are you sure?',
        text: isRtl() ? 'سوف تكوت قادرًا على التراجع عن ذلك' : 'You will be able to revert this',
        icon: "warning",
        showCancelButton: !0,
        confirmButtonText: isRtl() ? 'تأكيد' : 'Sure',
        cancelButtonText: isRtl() ? 'ألغاء' : 'Cancel',
        customClass: {
            confirmButton: "btn btn-danger",
            cancelButton: "btn btn-outline-secondary ms-1"
        },
        buttonsStyling: !1
    }).then((function(t) {
        if(t.value){
            createUpdateForm($(event).data('url'))
            $('#updateForm').submit();
        }
    }))
}


function confirmDelete(event){
    Swal.fire({
        title: isRtl() ? 'هل انت متأكد من  ذلك ؟ّ' : 'Are you sure?',
        text: isRtl() ? 'لن تكون قادرًا على التراجع عن ذلك' : 'You won\'t be able to revert this',
        icon: "warning",
        showCancelButton: !0,
        confirmButtonText: isRtl() ? 'تأكيد' : 'Sure',
        cancelButtonText: isRtl() ? 'ألغاء' : 'Cancel',
        customClass: {
            confirmButton: "btn btn-danger",
            cancelButton: "btn btn-outline-secondary ms-1"
        },
        buttonsStyling: !1
    }).then((function(t) {
        if(t.value){
            createDeleteForm($(event).data('url'))
            $('#deleteForm').submit();
        }
    }))
}



function confirmChangeStatus(event, url = undefined, inputs = {}){
    Swal.fire({
        title: isRtl() ? 'هل انت متأكد من  ذلك ؟ّ' : 'Are you sure?',
        text: isRtl() ? 'لن تكون قادرًا على التراجع عن ذلك' : 'You won\'t be able to revert this',
        icon: "warning",
        showCancelButton: !0,
        confirmButtonText: isRtl() ? 'تأكيد' : 'Sure',
        cancelButtonText: isRtl() ? 'ألغاء' : 'Cancel',
        customClass: {
            confirmButton: "btn btn-danger",
            cancelButton: "btn btn-outline-secondary ms-1"
        },
        buttonsStyling: !1
    }).then((function(t) {
        if(t.value){
            createUpdateForm(url === undefined ? $(event).data('url') : url, inputs)
            $('#updateForm').submit();
        }
    }))
}


function createDeleteForm(action) {
  let form = document.createElement('form');
  form.method = 'post';
  form.action = action;
  form.setAttribute('id', 'deleteForm');
  let token = document.querySelector("meta[name='csrf']").getAttribute("content");
  $(form).append(`<input  type="hidden" name="_token" value="${token}">`);
  $(form).append(`<input  type="hidden" name="_method" value="delete">`);
  document.body.append(form);
  return form;
}
function createUpdateForm(action, inputs = []) {
  $('#updateForm').remove();

  let form = document.createElement('form');
  form.method = 'post';
  form.action = action;
  form.setAttribute('id', 'updateForm');
  let token = document.querySelector("meta[name='csrf']").getAttribute("content");
  $(form).append(`<input  type="hidden" name="_token" value="${token}">`);
  $(form).append(`<input  type="hidden" name="_method" value="put">`);
    for (const input in inputs) {
        $(form).append(`<input  type="hidden" name="${input}" value="${inputs[input]}">`);
    }
  document.body.append(form);
  return form;
}


class DataTable {
    constructor(url, selector, useExport = true, options) {
        this.url = url;
        this.useExport = useExport;
        this.options = options;
        this.selector = selector;
        this.buttons = [];
        this.displayLength = 7;
        this.lengthMenu = [[7, 25, 50, 75, 100, -1], [7, 25, 50, 75, 100, isRtl() ? 'الكل' : 'All']];
        this.dom = !useExport
            ? '<"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>'
            : '<"card-header border-bottom p-1"<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>';
    }

    render(columns) {

        if(this.useExport)
            this.useExportButtons(this.options);

        let locale = document.querySelector("meta[name='locale']").getAttribute("content");

        let language = "ar" === locale ? 'Arabic' : 'English';
        let options = {
            stateSave: true,
            processing: true,
            serverSide: true,
            ajax: this.url,
            columns: columns,
            dom: this.dom,
            displayLength: this.displayLength,
            lengthMenu: this.lengthMenu,
            language: {
                url: `/datatables/${language}.json`,
                paginate: {
                    previous: "&nbsp;",
                    next: "&nbsp;"
                }
            },
            search: {
                "regex": true
            },
            drawCallback: function(settings) {

                $(function() {
                    //$(this.selector).treeFy({treeColumn: 1});
                });
            }
        }

        if(this.buttons.length > 0)
            options.buttons = this.buttons

        this.table = $(this.selector).DataTable(options)
    }

    reload(url) {
        this.table.ajax.url( url ).load();
    }

    lengthMenu(lengthMenu, displayLength) {
        this.displayLength = displayLength;
        this.lengthMenu = lengthMenu;
    }

    addButton(buttonTitle, buttonClass, attr = {}) {
        let button = {
            text: feather.icons.plus.toSvg({
                class: "me-50 font-small-4"
            }) + buttonTitle,
            className: `btn btn-${buttonClass}`,
            attr: attr
        }
        this.buttons.push(button)
    }

    useExportButtons(options) {
        let exportButtons = {
            extend: "collection",
            className: "btn btn-outline-secondary dropdown-toggle me-2",
            text: feather.icons.share.toSvg({
                class: "font-small-4 me-50"
            }) + options.title,
            buttons: [{
                extend: "print",
                text: feather.icons.printer.toSvg({
                    class: "font-small-4 me-50"
                }) + options.print.title,
                className: "dropdown-item",
                exportOptions: {
                    columns: options.print.exportColumns
                }
            }, {
                extend: "csv",
                text: feather.icons["file-text"].toSvg({
                    class: "font-small-4 me-50"
                }) + options.csv.title,
                className: "dropdown-item",
                exportOptions: {
                    columns: options.csv.exportColumns
                }
            }, {
                extend: "excel",
                text: feather.icons.file.toSvg({
                    class: "font-small-4 me-50"
                }) + options.excel.title,
                className: "dropdown-item",
                exportOptions: {
                    columns: options.excel.exportColumns
                }
            },

            /*    {
                extend: "pdf",
                text: feather.icons.clipboard.toSvg({
                    class: "font-small-4 me-50"
                }) + "Pdf",
                className: "dropdown-item",
                exportOptions: {
                    columns: exportColumns
                }
            },

                {
                extend: "copy",
                text: feather.icons.copy.toSvg({
                    class: "font-small-4 me-50"
                }) + "Copy",
                className: "dropdown-item",
                exportOptions: {
                    columns: exportColumns
                }
            }*/],
            init: function(e, t, a) {
                $(t).removeClass("btn-secondary"), $(t).parent().removeClass("btn-group"), setTimeout((function() {
                    $(t).closest(".dt-buttons").removeClass("btn-group").addClass("d-inline-flex")
                }), 50)
            }
        };

        this.buttons.push(exportButtons)
    }

}


