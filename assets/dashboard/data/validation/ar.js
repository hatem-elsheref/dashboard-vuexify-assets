$.extend($.validator.messages, {
    required: "{0} مطلوب.",
    remote: "يرجى تصحيح هذا الحقل.",
    email: "{0} يجب أن يكون عنوان بريد إلكتروني صالح.",
    url: "{0} يجب أن يكون عنوان URL صالح.",
    date: "{0} يجب أن يكون تاريخ صالح.",
    dateISO: "{0} يجب أن يكون تاريخ صالح (ISO).",
    number: "{0} يجب أن يكون رقمًا صالحًا.",
    digits: "{0} يجب أن يحتوي على أرقام فقط.",
    creditcard: "{0} يجب أن يكون رقم بطاقة ائتمان صالح.",
    equalTo: "{0} يجب أن يكون مساويًا لـ {1}.",
    accept: "{0} يجب أن يحتوي على امتداد صالح.",
    maxlength: jQuery.validator.format("{0} يجب ألا يتجاوز {1} حرفًا."),
    minlength: jQuery.validator.format("{0} يجب أن لا يقل عن {1} حرفًا."),
    rangelength: jQuery.validator.format("{0} يجب أن يكون بين {1} و {2} حرفًا."),
    range: jQuery.validator.format("{0} يجب أن يكون بين {1} و {2}."),
    max: jQuery.validator.format("{0} يجب أن يكون أقل من أو يساوي {1}."),
    min: jQuery.validator.format("{0} يجب أن يكون أكبر من أو يساوي {1}.")
});
