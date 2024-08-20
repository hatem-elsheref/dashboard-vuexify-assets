$.extend($.validator.messages, {
    required: "{0} is required.",
    remote: "Please fix this field.",
    email: "{0} must be a valid email address.",
    url: "{0} must be a valid URL.",
    date: "{0} must be a valid date.",
    dateISO: "{0} must be a valid date (ISO).",
    number: "{0} must be a valid number.",
    digits: "{0} must contain only digits.",
    creditcard: "{0} must be a valid credit card number.",
    equalTo: "{0} must be equal to {1}.",
    accept: "{0} must have a valid extension.",
    maxlength: jQuery.validator.format("{0} must be no more than {1} characters."),
    minlength: jQuery.validator.format("{0} must be at least {1} characters."),
    rangelength: jQuery.validator.format("{0} must be between {1} and {2} characters long."),
    range: jQuery.validator.format("{0} must be between {1} and {2}."),
    max: jQuery.validator.format("{0} must be less than or equal to {1}."),
    min: jQuery.validator.format("{0} must be greater than or equal to {1}.")
});
