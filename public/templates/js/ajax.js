$(document).ready(function () {
    "use strict";

    if (window.location.pathname.indexOf('dashboard') !== -1) {
        $('li#dashboard').addClass('active');
    }

    if (window.location.pathname.indexOf('product') !== -1) {
        $('li#product').addClass('active');
        cms_product_search();
        cms_load_listgroup();
        cms_paging_manufacture(1);
        cms_paging_group(1);
        cms_loadListproOption();
        cms_paging_product(1);
    }

    if (window.location.pathname.indexOf('orders') !== -1) {
        $('.input-daterange').datepicker({
            format: "dd-mm-yyyy",
            todayBtn: "linked",
            language: "vi",
            autoclose: true,
            todayHighlight: true,
            toggleActive: true
        });

        cms_set_current_week();
        $('li#orders').addClass('active');
        cms_paging_order(1);
        cms_order_search();
    }

    if (window.location.pathname.indexOf('revenue') !== -1) {
        $('.input-daterange').datepicker({
            format: "dd-mm-yyyy",
            todayBtn: "linked",
            language: "vi",
            autoclose: true,
            todayHighlight: true,
            toggleActive: true
        });
        cms_set_current_week();
        $('li#revenue').addClass('active');
        cms_paging_revenue(1);
        cms_revenue_search();
    }

    if (window.location.pathname.indexOf('profit') !== -1) {
        $('.input-daterange').datepicker({
            format: "dd-mm-yyyy",
            todayBtn: "linked",
            language: "vi",
            autoclose: true,
            todayHighlight: true,
            toggleActive: true
        });
        cms_set_current_week();
        $('li#profit').addClass('active');
        cms_paging_profit(1);
        cms_profit_search();
    }

    if (window.location.pathname.indexOf('import') !== -1) {
        $('.input-daterange').datepicker({
            format: "dd-mm-yyyy",
            todayBtn: "linked",
            language: "vi",
            autoclose: true,
            todayHighlight: true,
            toggleActive: true
        });
        cms_set_current_week();
        cms_input_search();
        $('li#import').addClass('active');
        cms_paging_input(1);
    }

    if (window.location.pathname.indexOf('inventory') !== -1) {
        $('li#inventory').addClass('active');
        cms_inventory_search();
        cms_paging_inventory(1);
        cms_loadListInvOption();
    }

    if (window.location.pathname.indexOf('config') !== -1) {
        $('li#config').addClass('active');
        cms_upstore();
        cms_crfunc();
        cms_upfunc();
        cms_crgroup();
        cms_radiogroup();
        cms_selboxgroup();
        cms_selboxstock();
        initBasic();
    }

    if (window.location.pathname.indexOf('customer') !== -1) {
        $('li#customer').addClass('active');
        $('#customer_birthday').datetimepicker({
            timepicker: false,
            format: 'Y/m/d',
            formatDate: 'Y/m/d',
            autoclose: true,
            defaultDate: '1989/01/01'
        });

        cms_customer_search();
        cms_supplier_search();
        cms_loadListCusOption();
        cms_loadListSupOption();
        cms_paging_supplier(1);
    }

    cms_search_box_customer();
    cms_search_box_sup();
    cms_change_store();
});

$(document).on('ready ajaxComplete', function () {
    cms_func_common();
});

function cms_func_common() {
    "use strict";
    cms_del_pro_order();
    fix_height_sidebar();
    cms_del_icon_click('.del-cys', '#search-box-cys');
    cms_del_icon_click('.del-mas', '#search-box-mas');
    btnClick('.btn-smf', '.btn-sm-after');
    /*
     * check password match
     *************************************/
    $('#pass2').on('inputkeypress', function () {
        var pass1 = $('#pass1').val(), pass2 = $('#pass2').val();
        if (!is_match(pass1, pass2)) {
            alert('M???t kh???u nh???p l???i kh??ng kh???p!');
            $("#pass2").focus();
            return false;
        }
    });

    if (window.location.pathname.indexOf('orders') !== -1) {
        $('#customer-id').on('change', function () {
            cms_paging_order(1);
        });

        $("input.discount-order").keyup(function () {
            cms_load_infor_order();
        });

        $("input.quantity_product_order").keyup(function () {
            cms_load_infor_order();
        });
    }

    if (window.location.pathname.indexOf('pos') !== -1) {
        $("input.discount-order").keyup(function () {
            cms_load_infor_order();
        });

        $("input.quantity_product_order").keyup(function () {
            cms_load_infor_order();
        });
    }
    $('.new-password').on('keyup', function () {
        var renewpass = $.trim($('#renewpass').val());
        var newpass = $.trim($('#newpass').val());
        if (renewpass == newpass) {
            $('#newpass-wrong').hide();
        } else {
            $('#newpass-wrong').show();
        }
    });

    $('#btn-changepass').on('click', function () {
        $(this).hide();
        $('.form-hide').slideDown('200');
    });

    $('#btn-cancel-pass').on('click', function () {
        $('.form-hide').slideUp('200');
        $('#btn-changepass').show();
    });

    $('.ajax-success').popover('show');

    $('body').on('click', '.chkAll', function () {
        var $checkboxies = $(this).closest('table').find('.chk');
        if ($(this).prop('checked')) {
            $checkboxies.prop('checked', true);
        } else {
            $checkboxies.prop('checked', false);
        }
    });

    $('ul.pagination li.active').click(function (event) {
        event.preventDefault();
    });

    $('.btn-close').on('click', function () {
        $('.ajax-error-ct').hide();
    });

    $("input.discount-import").keyup(function () {
        cms_load_infor_import();
    });

    $("input.quantity_product_import").keyup(function () {
        cms_load_infor_import();
    });

    $(".txtNumber").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // Allow: Ctrl+A, Command+A
            (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) ||
                // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $("input.price-order").keyup(function () {
        cms_load_infor_import();
    });

    $(".txtMoney").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // Allow: Ctrl+A, Command+A
            (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) ||
                // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $(".customer-pay").keyup(function () {
        var customer_pay;
        if ($('input.customer-pay').val() == '')
            customer_pay = 0;
        else
            customer_pay = cms_decode_currency_format($('input.customer-pay').val());

        var total_after_discount = cms_decode_currency_format($('.total-after-discount').text());
        var debt = total_after_discount - customer_pay;

        if (debt >= 0) {
            $('div.debt').text(cms_encode_currency_format(debt));
            $('label.debt').text('N???');
        }
        else {
            $('div.debt').text(cms_encode_currency_format(-debt));
            $('label.debt').text('Ti???n th???a');
        }
    });

    $(".txtMoney").keyup(function () {
        if ($(this).val() == '')
            $(this).val(0);
        else {
            var value = cms_decode_currency_format($(this).val());
            $(this).val(cms_encode_currency_format(value));
        }
    });

    $('.chk').on('change', function (e) {
        e.preventDefault();
        if ($(this).prop('checked') == false) {
            $('.chkAll').prop('checked', false);
        }
        if ($('.chk:checked').length == $('.chk').length) {
            $('.chkAll').prop('checked', true);
        }
    });
}

function hotkey(e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    //F2
    if (keycode == '113') {
        $('#search-pro-box').focus();
    }
    //F4
    if (keycode == '115') {
        $('#search-box-cys').focus();
    }
    //F7
    if (keycode == '118') {
        $('.discount-order').focus();
    }
    //F8
    if (keycode == '119') {
        $('.customer-pay').focus();
    }
    //F9
    if (keycode == '120') {
        cms_save_orders(3);
    }
    //F10
    if (keycode == '121') {
        cms_save_orders(4);
    }
}

function cms_del_pro_order() {
    $('body').on('click', '.del-pro-order', function () {
        $(this).parents('tr').remove();
        cms_load_infor_order();
        cms_load_infor_import();
        $seq = 0;
        $('tbody#pro_search_append tr').each(function () {
            $seq += 1;
            value_input = $(this).find('td.seq').text($seq);
        });
    });
}

/*
 * Process ajax request
 *
 * $param l?? m???t object {'type','url', 'data', 'callback'}
 *
 * default type POST
 /*********************************************************************/
function cms_adapter_ajax($param) {
    $.ajax({
        url: $param.url,
        type: $param.type,
        data: $param.data,
        async: true,
        success: $param.callback
    });
}

/*
 * T???o nh??n vi??n
 /****************************************/
function cms_cruser() {
    "use strict";
    var $display = $.trim($('#frm-cruser #display_name').val());
    var $username = $.trim($('#frm-cruser #manv').val());
    var $mail = $.trim($('#frm-cruser #mail').val());
    var $password = $.trim($('#frm-cruser #password').val());
    var $group = $('#frm-cruser .group-user .group-selbox #sel-group').val();
    var $stock = $('#frm-cruser .stock-selbox #sel-stock').val();
    $('#frm-cruser .group-user .group-selbox #sel-group').on('change', function () {
        $group = $(this).val();
    });
    if ($display.length == 0) {
        $('.error-display_name').text('Vui l??ng nh???p t??n hi???n th???!');
    } else {
        $('.error-display_name').text('');
    }
    if ($username.length == 0) {
        $('.error-manv').text('Vui l??ng nh???p email!');
    } else {
        $('.error-manv').text('');
    }
    if ($mail.length == 0) {
        $('.error-mail').text('Vui l??ng nh???p email!');
    } else {
        $('.error-mail').text('');
    }
    if ($password.length == 0) {
        $('.error-password').text('Vui l??ng nh???p m???t kh???u!');
    } else {
        $('.error-password').text('');
    }

    if ($display && $mail && $password && $group && $username) {
        var $data = {
            'display': $display,
            'username': $username,
            'mail': $mail,
            'group': $group,
            'password': $password,
            'store_id': $stock
        };
        var $param = {
            'type': 'POST',
            'url': 'ajax/cms_cruser',
            'data': $data,
            'callback': function (data) {
                if (data != '1') {
                    $('.ajax-error-ct').html(data).parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.btn-close').trigger('click');

                    $('.ajax-error-ct').hide();
                    cms_upuser();
                    $('.ajax-success-ct').html('Th??m th??nh vi??n m???i th??nh c??ng!').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_upuser() {
    var $param = {
        'type': 'POST',
        'url': 'ajax/cms_upuser',
        'data': null,
        'callback': function (data) {
            if (data != '0') {
                $('#user .table-user tbody').html(data);
            } else {
                var $html = '<tr><td colspan="7" class="text-center">Kh??ng c?? ng?????i d??ng ????? hi???n th???</td> </tr>';
                $('#user.table-user tbody').html($html);
            }
        }
    };
    cms_adapter_ajax($param);
}
/*
 * L??u nh??n vi??n
 /***************************/
function cms_save_item_user(id) {
    var $display_name = $('#user .table-user tr.edit-tr-item-' + id + ' td.itdisplay_name input').val();
    var $mail = $('#user .table-user tr.edit-tr-item-' + id + ' td.itemail input').val();
    var $group = $('#user .table-user tr.edit-tr-item-' + id + ' td.itgroup_name #sel-group').val();
    var $status = $('#user .table-user tr.edit-tr-item-' + id + ' td.ituser_status .ituser_status').val();
    var $data = {
        'data': {
            'id': id,
            'display_name': $display_name,
            'email': $mail,
            'group_id': $group,
            'user_status': $status
        }
    };
    var $param = {
        'type': 'POST',
        'url': 'ajax/cms_save_item_user',
        'data': $data,
        'callback': function (data) {
            if (data == '1') {
                cms_upuser();
                cms_upgroup();
            } else if (data == '0') {
                alert('L??u kh??ng th??nh c??ng!');
            } else {
                $('.ajax-error-ct').html(data).parent().fadeIn().delay(1000).fadeOut('slow');
            }
        }
    };
    cms_adapter_ajax($param);
}
/*
 * X??a nh??n vi??n
 /***************************/
function cms_del_usitem($id) {
    var conf = confirm('B???n ch???c ch???n mu???n x??a!');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'ajax/cms_del_usitem',
            'data': {'id': $id},
            'callback': function (data) {
                if (data != '0') {
                    cms_upuser();
                    $('.ajax-success-ct').html('X??a th??nh vi??n th??nh c??ng!').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    alert('Kh??ng th??? x??a nh??n vi??n!');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}
/*
 * T???o ch???c n??ng
 /****************************************/
function cms_crfunc() {
    "use strict";
    $('.btn-crfunc').on('click', function (e) {
        e.preventDefault();
        var $permiss_url = $.trim($('#permisstion_url').val());
        var $permiss_name = $.trim($('#permisstion_name').val());

        if ($permiss_url.length == 0) {
            $('.error-permisstion_url').text('Vui l??ng nh???p url');
        } else {
            $('.error-permisstion_url').text('');
        }
        if ($permiss_name.length == 0) {
            $('.error-permisstion_name').text('Vui l??ng nh???p t??n ch???c n??ng');
        } else {
            $('.error-permisstion_name').text('');
        }
        if ($permiss_url && $permiss_name) {
            var $param = {
                'type': 'POST',
                'url': 'ajax/cms_crfunc',
                'data': {'url': $permiss_url, 'name': $permiss_name},
                'callback': function (data) {
                    if (data != '1') {
                        $('.ajax-error-ct').html(data).parent().fadeIn().delay(1000).fadeOut('slow');
                    } else {
                        $('.btn-close').trigger('click');
                        $('.ajax-error-ct').hide();
                        cms_upfunc();
                    }
                }
            };
            cms_adapter_ajax($param);
        }
    });
}

function cms_save_template() {
    "use strict";
    var $content = CKEDITOR.instances['ckeditor'].getData();
    var $data = {
        'data': {
            'content': $content
        }
    };
    var id = $('#template').val();
    var $param = {
        'type': 'POST',
        'url': 'config/cms_save_template/' + id,
        'data': $data,
        'callback': function (data) {
            if (data == '1') {
                $('.ajax-success-ct').html('L??u m???u in th??nh c??ng!').parent().fadeIn().delay(1000).fadeOut('slow');
            } else if (data == '0') {
                $('.ajax-error-ct').html('Th???c hi???n kh??ng th??nh c??ng!').parent().fadeIn().delay(1000).fadeOut('slow');
            } else {
                $('.ajax-error-ct').html(data).parent().fadeIn().delay(1000).fadeOut('slow');
            }
        }
    };
    cms_adapter_ajax($param);
}

function cms_change_password() {
    "use strict";
    var oldpass = $.trim($('#oldpass').val());
    var newpass = $.trim($('#newpass').val());
    var renewpass = $.trim($('#renewpass').val());
    if(newpass!=renewpass){
        alert('M???t kh???u m???i kh??ng gi???ng nhau, Vui l??ng nh???p l???i');
    }else{
        var $data = {
            'data': {
                'oldpass': oldpass,
                'newpass':newpass
            }
        };

        var $param = {
            'type': 'POST',
            'url': 'account/cms_change_password/',
            'data': $data,
            'callback': function (data) {
                if (data == '1') {
                    $('.ajax-success-ct').html('?????i m???t kh???u th??nh c??ng!').parent().fadeIn().delay(1000).fadeOut('slow');
                    $('.form-hide').slideUp('200');
                    $('#btn-changepass').show();
                } else if (data == '0') {
                    $('.ajax-error-ct').html('M???t kh???u c??? kh??ng ????ng!').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.ajax-error-ct').html(data).parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_load_template() {
    "use strict";

    var $id = $('#template').val();
    var $param = {
        'type': 'POST',
        'url': 'config/cms_load_template/' + $id,
        'data': null,
        'callback': function (data) {
            if (data == '0') {
                $('.ajax-error-ct').html('Th???c hi???n kh??ng th??nh c??ng!').parent().fadeIn().delay(1000).fadeOut('slow');
            } else {
                CKEDITOR.instances['ckeditor'].setData(data);
                $('.ajax-success-ct').html('Load m???u in th??nh c??ng!').parent().fadeIn().delay(1000).fadeOut('slow');
            }
        }
    };
    cms_adapter_ajax($param);
}

/*
 * Danh s??ch ch???c n??ng
 /****************************************/
function cms_upfunc() {
    "use strict";
    var $param = {
        'type': 'POST',
        'url': 'ajax/cms_upfunc',
        'data': null,
        'callback': function (data) {
            if (data != '0') {
                $('#functions .table-function tbody').html(data);
            } else {
                var $html = '<tr><td colspan="3" class="text-center">Kh??ng c?? ch???c n??ng ????? hi???n th???</td> </tr>';
                $('#functions .table-function tbody').html($html);
            }
        }
    };
    cms_adapter_ajax($param);
}

/*
 * Th??m nh??m ng?????i d??ng
 /****************************************/
function cms_crgroup() {
    "use strict";
    $('.btn-crgroup').on('click', function (e) {
        e.preventDefault();
        var $group_name = $.trim($('#group-name').val());

        if ($group_name.length == 0) {
            $('.error-group_name').text('Vui l??ng nh???p t??n nh??m ng?????i d??ng');
        } else {
            $('.error-group_name').text('');
        }

        if ($group_name) {
            var $param = {
                'type': 'POST',
                'url': 'ajax/cms_crgroup',
                'data': {'group_name': $group_name},
                'callback': function (data) {
                    if (data != '1') {
                        $('.ajax-error-ct').html('Nh??m ng?????i d??ng ???? t???n t???i ho???c kh??ng ????ng!').parent().fadeIn().delay(1000).fadeOut('slow');
                    } else {
                        $('.btn-close').trigger('click');
                        cms_upgroup();
                        cms_radiogroup();
                        $('.ajax-success-ct').html('B???n ???? t???o m???i Nh??m ng?????i d??ng th??nh c??ng!').parent().fadeIn().delay(1000).fadeOut('slow');

                    }
                }
            };
            cms_adapter_ajax($param);
        }
    });
}

function cms_crstore() {
    "use strict";
    var $store_name = $.trim($('#store-name').val());
    if ($store_name.length == 0) {
        $('.error-store_name').text('Vui l??ng nh???p t??n kho');
    } else {
        $('.error-store_name').text('');
    }

    if ($store_name) {
        var $param = {
            'type': 'POST',
            'url': 'config/cms_crstore/' + $store_name,
            'data': null,
            'callback': function (data) {
                if (data != '1') {
                    $('.ajax-error-ct').html('T??n kho ???? t???n t???i ho???c kh??ng ????ng!').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.btn-close').trigger('click');

                    $('.ajax-success-ct').html('B???n ???? t???o kho th??nh c??ng!').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_upstore();
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

/*
 * Danh s??ch Nh??m
 /****************************************/
function cms_upgroup() {
    "use strict";
    var $param = {
        'type': 'POST',
        'url': 'ajax/cms_upgroup',
        'data': null,
        'callback': function (data) {
            if (data != '0') {
                $('#functions .table-group tbody').html(data);
            } else {
                var $html = '<tr><td colspan="3" class="text-center">Kh??ng c?? Group ????? hi???n th???</td> </tr>';
                $('#functions .table-group tbody').html($html);
            }
        }
    };
    cms_adapter_ajax($param);
}


function cms_upstore() {
    "use strict";
    var $param = {
        'type': 'POST',
        'url': 'ajax/cms_upstore',
        'data': null,
        'callback': function (data) {
            if (data != '0') {
                $('#stores .table-store tbody').html(data);
            } else {
                var $html = '<tr><td colspan="3" class="text-center">Kh??ng c?? kho ????? hi???n th???</td> </tr>';
                $('#stores .table-store tbody').html($html);
            }
        }
    };
    cms_adapter_ajax($param);
}
/*
 * Load list group
 /****************************************/
function cms_radiogroup() {
    "use strict";
    var $param = {
        'type': 'POST',
        'url': 'ajax/cms_radiogroup',
        'data': null,
        'callback': function (data) {
            if (data != '0') {
                $('#functions .group-user .group-radio').html(data);
            } else {
                var $html = ' <button style="color: green; font-size: 16px;" class="btn btn-default btn-sm create-group" data-toggle="modal" data-target="#create-group"><i class="fa fa-plus"></i></button>';
                $('#functions .group-user .group-radio').html($html);
            }
        }
    };
    cms_adapter_ajax($param);
}

function cms_selboxgroup() {
    "use strict";
    var $param = {
        'type': 'POST',
        'url': 'ajax/cms_selboxgroup',
        'data': null,
        'callback': function (data) {
            if (data != '0') {
                $('.group-user .group-selbox').html(data);
                cms_upgroup();
            } else {
                $('.group-user .group-selbox').html($html);
            }
        }
    };
    cms_adapter_ajax($param);
}

/*
 * X??a Group
 /***********/
function cms_del_gritem($id) {
    "use strict";
    var conf = confirm('B???n ch???c ch???n mu???n x??a!');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'ajax/cms_del_gritem',
            'data': {'id': $id},
            'callback': function (data) {
                if (data != '0') {
                    cms_upgroup();
                    cms_radiogroup();
                } else {
                    alert('Kh??ng th??? x??a nh??m khi ??ang c?? nh??n vi??n trong nh??m!');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

/*
 * L??u quy???n cho group
 /***************************/
function cms_savefunc() {
    "use strict";
    var $group_id = $('div.group-user .group-radio input:checked').val();
    if (!$group_id) {
        $('.ajax-error-ct').html('Vui l??ng ch???n nh??m ng?????i s??? d???ng tr?????c khi th???c hi???n l??u quy???n!').parent().fadeIn().delay(1000).fadeOut('slow');
        return;
    }
    var $chkval = [];
    $('.chk:checked').each(function () {
        $chkval.push($(this).val());
    });
    var $param = {
        'type': 'POST',
        'url': 'ajax/cms_savefunc',
        'data': {'gid': $group_id, 'listid': $chkval},
        'callback': function (data) {
            if (data == '1') {
                $('.ajax-success-ct').html('L??u ch???c n??ng cho nh??m th??nh c??ng.').parent().fadeIn().delay(1000).fadeOut('slow');
            } else if (data == '0') {
                $('.ajax-error-ct').html('Th???c hi???n kh??ng th??nh c??ng do Nh??m kh??ng t???n t???i!').parent().fadeIn().delay(1000).fadeOut('slow');
            } else {
                $('.ajax-error-ct').html('L???i h??? th???ng vui l??ng li??n h??? nh?? cung c???p ph???n m???m!').parent().fadeIn().delay(1000).fadeOut('slow');
            }
        }
    };
    cms_adapter_ajax($param);
}

function cms_save_item_group($id) {
    "use strict";
    var $group_name = $('.table-group tr.edit-tr-item-' + $id + ' td.itgr_name input').val();
    if ($group_name.length == 0) {
        alert('T??n nh??m ng?????i d??ng kh??ng ???????c b??? tr???ng!');
    } else {
        var $data = {'gid': $id, 'group_name': $group_name};
        var $param = {
            'type': 'POST',
            'url': 'ajax/cms_save_item_group',
            'data': $data,
            'callback': function (data) {
                if (data == '1') {
                    cms_upgroup();
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Th???c hi???n kh??ng th??nh c??ng!').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.ajax-error-ct').html(data).parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

/*
 * CUSTOMER
 /***************************/
function cms_reset_valCustomer() {
    'use strict';
    $('#customer_code').val('');
    $('#customer_name').val('');
    $('#customer_phone').val('');
    $('#customer_email').val('');
    $('#customer_addr').val('');
    $('#customer_notes').val('');
    $('#customer_birthday').val('');
    $('.customer_gender').val(0);
}

function cms_reset_valSupplier() {
    'use strict';
    $('#supplier_code').val('');
    $('#supplier_name').val('');
    $('#supplier_phone').val('');
    $('#supplier_email').val('');
    $('#supplier_addr').val('');
    $('#supplier_notes').val('');
}

function cms_crCustomer() {
    "use strict";
    var $code = $.trim($('#customer_code').val());
    var $name = $.trim($('#customer_name').val());
    var $phone = $.trim($('#customer_phone').val());
    var $mail = $.trim($('#customer_email').val());
    var $address = $('#customer_addr').val();
    var $notes = $('#customer_notes').val();
    var $birthday = $('#customer_birthday').val();
    var $gender = 0;
    $('.customer_gender').each(function (index) {
        if ($(this).prop('checked') == true) {
            $gender = $(this).val();
        }
    });
    if ($name.length == 0) {
        $('.error-customer_name').text('Vui l??ng nh???p t??n kh??ch h??ng.');
    } else {
        $('.error-group_name').text('');
        if ($phone.length != 0) {
            if (!$.isNumeric($phone)) {
                $('.error-customer_phone').text('S??? ??i???n tho???i ph???i l?? s???.');
                return;
            } else {
                $('.error-customer_phone').text('');
            }
        }
        var $data = {
            'data': {
                'customer_code': $code,
                'customer_name': $name,
                'customer_phone': $phone,
                'customer_email': $mail,
                'customer_addr': $address,
                'notes': $notes,
                'customer_birthday': $birthday,
                'customer_gender': $gender
            }
        };
        var $param = {
            'type': 'POST',
            'url': 'customer/cms_crcustomer',
            'data': $data,
            'callback': function (data) {
                if (data > 0) {
                    $('.btn-close').trigger('click');
                    $('.ajax-error-ct').hide();
                    $('.ajax-success-ct').html('B???n ???? t???o m???i kh??ch h??ng th??nh c??ng!').parent().fadeIn().delay(1000).fadeOut('slow');
                    $("#search-box-cys").prop('readonly', true).attr('data-id', data).val($name);
                    $(".del-cys").html('<i class="fa fa-minus-circle" aria-hidden="true"></i>');
                    cms_paging_listcustomer(1);
                    cms_reset_valCustomer();
                }
                else {
                    $('.ajax-error-ct').html('M?? kh??ch h??ng ???? t???n t???i, Vui l??ng ch???n m?? kh??c').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_delCustomer($id, $page) {
    'use strict';
    var conf = confirm('B???n ch???c ch???n mu???n x??a kh??ch h??ng n??y!');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'customer/cms_delCustomer',
            'data': {'id': $id},
            'callback': function (data) {
                if (data == '0') {
                    $('.ajax-error-ct').html('L???i! kh??ng th??? x??a Kh??ch h??ng').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.ajax-success-ct').html('B???n ???? x??a kh??ch h??ng th??nh c??ng!').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_paging_listcustomer($page);
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_save_edit_customer() {
    'use strict';
    var $ids = $('.tr-item-customer').attr('id');
    var $id = parseInt($ids.replace(/[^\d.]/g, ''));
    var $name = $.trim($('.customer-supplier #customer_name').val());
    var $phone = $.trim($('.customer-supplier #customer_phone').val());
    var $mail = $.trim($('.customer-supplier #customer_email').val());
    var $address = $('.customer-supplier #customer_addr').val();
    var $notes = $('.customer-supplier #notes').val();
    var $birthday = $('.customer-supplier #customer_birthday').val();
    var $gender = 0;
    $('.customer-supplier .customer_gender').each(function () {
        if ($(this).prop('checked') == true) {
            $gender = $(this).val();
        }
    });
    if ($name.length == 0) {
        $('.error-customer_name').text('T??n kh??ch h??ng kh??ng ???????c ????? tr???ng.');
    } else {
        $('.error-customer_name').text('');
        if ($phone.length != 0) {
            if (!$.isNumeric($phone)) {
                $('.error-customer_phone').text('S??? ??i???n tho???i ph???i l?? s???.');
                return;
            } else {
                $('.error-customer_phone').text('');
            }
        }
        var $data = {
            'data': {
                'customer_name': $name,
                'customer_phone': $phone,
                'customer_email': $mail,
                'customer_addr': $address,
                'notes': $notes,
                'customer_birthday': $birthday,
                'customer_gender': $gender
            }
        };
        var $param = {
            'type': 'POST',
            'url': 'customer/cms_save_edit_customer/' + $id,
            'data': $data,
            'callback': function (data) {
                if (data == '1') {
                    $('.ajax-success-ct').html('B???n ???? c???p nh???t kh??ch h??ng th??nh c??ng!').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_reset_valCustomer();
                    cms_detail_after_edit($id);
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_detail_after_edit($id) {
    var $param = {
        'type': 'POST',
        'url': 'customer/cms_detail_itemcust/' + $id,
        'data': null,
        'callback': function (data) {
            $('.customer-supplier').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_crsup() {
    $code = $.trim($('#supplier_code').val());
    $name = $.trim($('#supplier_name').val());
    $phone = $.trim($('#supplier_phone').val());
    $mail = $.trim($('#supplier_email').val());
    $addr = $.trim($('#supplier_addr').val());
    $tax_code = $.trim($('#tax_code').val());
    $notes = $.trim($('#supplier_notes').val());
    if ($name.length == 0) {
        $('.error-supplier_name').text('T??n nh?? cung c???p kh??ng ???????c ????? tr???ng.');
    } else {
        $('.error-supplier_name').text('');
        if ($phone.length != 0) {
            if (!$.isNumeric($phone)) {
                $('.error-supplier_phone').text('S??? ??i???n tho???i ph???i l?? s???.');
                return;
            } else {
                $('.error-supplier_phone').text('');
            }
        }
        var $data = {
            'data': {
                'supplier_code': $code,
                'supplier_name': $name,
                'supplier_phone': $phone,
                'supplier_email': $mail,
                'supplier_addr': $addr,
                'tax_code': $tax_code,
                'notes': $notes
            }
        };
        var $param = {
            'type': 'POST',
            'url': 'supplier/cms_crsup',
            'data': $data,
            'callback': function (data) {
                if (data > 0) {
                    $('.btn-close').trigger('click');
                    $('.ajax-error-ct').hide();
                    $('.ajax-success-ct').html('B???n ???? t???o m???i nh?? cung c???p th??nh c??ng!').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_paging_supplier(1);
                    cms_reset_valSupplier();
                    $("#search-box-mas").prop('readonly', true).attr('data-id', data).val($name);
                    $(".del-mas").html('<i class="fa fa-minus-circle" aria-hidden="true"></i>');
                } else {
                    $('.ajax-error-ct').html('L???i h??? th???ng.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_print_order($id_template, $id_order) {
    var $param = {
        'type': 'POST',
        'url': 'orders/cms_print_order',
        'data': {'data': {'id_template': $id_template, 'id_order': $id_order}},
        'callback': function (data) {
            var restorepage = $('body').html();
            var printcontent = data;
            $('body').empty().html(printcontent);
            window.print();
            $('body').html(restorepage);
        }
    };
    cms_adapter_ajax($param);
}

function cms_print_order_in_create($id_template, $id_order) {
    var $param = {
        'type': 'POST',
        'url': 'orders/cms_print_order',
        'data': {'data': {'id_template': $id_template, 'id_order': $id_order}},
        'callback': function (data) {
            var restorepage = $('body').html();
            var printcontent = data;
            $('body').empty().html(printcontent);
            window.print();
            $('body').html(restorepage);
            cms_vsell_order();
        }
    };
    cms_adapter_ajax($param);
}

function cms_print_order_in_pos($id_template, $id_order) {
    var $param = {
        'type': 'POST',
        'url': 'orders/cms_print_order',
        'data': {'data': {'id_template': $id_template, 'id_order': $id_order}},
        'callback': function (data) {
            var restorepage = $('body').html();
            var printcontent = data;
            $('body').empty().html(printcontent);
            window.print();
            //$('body').html(restorepage);
            location.reload();
        }
    };
    cms_adapter_ajax($param);
}

function cms_print_input($id_template, $id_input) {
    var $param = {
        'type': 'POST',
        'url': 'import/cms_print_input',
        'data': {'data': {'id_template': $id_template, 'id_input': $id_input}},
        'callback': function (data) {
            var printContents = data;
            var originalContents = document.body.innerHTML;
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
        }
    };
    cms_adapter_ajax($param);
}

function cms_print_input_in_create($id_template, $id_input) {
    var $param = {
        'type': 'POST',
        'url': 'import/cms_print_input',
        'data': {'data': {'id_template': $id_template, 'id_input': $id_input}},
        'callback': function (data) {
            var printContents = data;
            var originalContents = document.body.innerHTML;
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
            cms_vsell_import();
        }
    };
    cms_adapter_ajax($param);
}

function cms_paging_supplier($page) {
    $keyword = $('.txt-ssupplier').val();
    $option = $('#sup-option').val();
    $data = {'data': {'option': $option, 'keyword': $keyword}};
    var $param = {
        'type': 'POST',
        'url': 'supplier/cms_paging_supplier/' + $page,
        'data': $data,
        'callback': function (data) {
            $('.sup-body').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_delsup($id, $page) {
    'use strict';
    var conf = confirm('B???n ch???c ch???n mu???n x??a nh?? cung c???p n??y!');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'supplier/cms_delsup',
            'data': {'id': $id},
            'callback': function (data) {
                if (data == '0') {
                    $('.ajax-error-ct').html('L???i! kh??ng th??? x??a nh?? cung c???p n??y').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.ajax-success-ct').html('B???n ???? x??a nh?? cung c???p th??nh c??ng!').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_paging_supplier($page);
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_detail_supplier($id) {
    'use strict';
    var $param = {
        'type': 'POST',
        'url': 'supplier/cms_detail_supplier/' + $id,
        'data': null,
        'callback': function (data) {
            $('.customer-supplier').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_detail_customer($id) {
    'use strict';
    var $param = {
        'type': 'POST',
        'url': 'customer/cms_detail_customer/' + $id,
        'data': null,
        'callback': function (data) {
            $('.customer-supplier').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_save_edit_sup() {
    'use strict';
    var $ids = $('.tr-item-sup').attr('id');
    var $id = parseInt($ids.replace(/[^\d.]/g, ''));
    var $name = $.trim($('.customer-supplier #supplier_name').val());
    var $phone = $.trim($('.customer-supplier #supplier_phone').val());
    var $mail = $.trim($('.customer-supplier #supplier_email').val());
    var $address = $('.customer-supplier #supplier_addr').val();
    var $tax_code = $('.customer-supplier #tax_code').val();
    var $notes = $('.customer-supplier #notes').val();

    if ($name.length == 0) {
        $('.error-supplier_name').text('T??n Nh?? cung c???p kh??ng ???????c ????? tr???ng.');
    } else {
        $('.error-supplier_name').text('');
        if ($phone.length != 0) {
            if (!$.isNumeric($phone)) {
                $('.error-supplier_phone').text('S??? ??i???n tho???i ph???i l?? s???.');
                return;
            } else {
                $('.error-supplier_phone').text('');
            }
        }
        var $data = {
            'data': {
                'supplier_name': $name,
                'supplier_phone': $phone,
                'supplier_email': $mail,
                'supplier_addr': $address,
                'notes': $notes,
                'tax_code': $tax_code
            }
        };
        var $param = {
            'type': 'POST',
            'url': 'supplier/cms_save_edit_sup/' + $id,
            'data': $data,
            'callback': function (data) {
                if (data == '1') {
                    $('.ajax-success-ct').html('B???n ???? c???p nh???t nh?? cung c???p th??nh c??ng!').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_detail_supplier($id);
                }
            }
        };
        cms_adapter_ajax($param);
    }
}
/*
 * PRODUCT
 /***************************/
function cms_vcrproduct() {
    var $param = {
        'type': 'POST',
        'url': 'product/cms_vcrproduct',
        'data': null,
        'callback': function (data) {
            $('.products').html(data);
            cms_product_group_show();
            cms_product_manufacture_show();
        }
    };
    cms_adapter_ajax($param);
}

function cms_create_manufacture($cont) {
    'user strict';
    var $prd_manuf_name = $.trim($('#prd_manuf_name').val());
    if ($prd_manuf_name.length == 0) {
        alert('Nh???p t??n Nh?? s???n xu???t s???n ph???m.');
    } else {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_create_manufacture',
            'data': {'data': {'prd_manuf_name': $prd_manuf_name}},
            'callback': function (data) {
                if (data == '1') {
                    cms_paging_manufacture(1);
                    cms_load_listmanufacture();
                    $('.ajax-success-ct').html('T???o nh?? s???n xu???t th??nh c??ng.').parent().fadeIn().delay(1000).fadeOut('slow');
                    $('#prd_manuf_name').val('');
                    if ($cont == 1)
                        $('.btn-close').trigger('click');
                } else {
                    $('.ajax-error-ct').html('T??n Nh?? s???n xu???t ???? c?? trong h??? th???ng. Vui l??ng ch???n t??n kh??c.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_paging_manufacture($page) {
    var $param = {
        'type': 'POST',
        'url': 'product/cms_paging_manufacture/' + $page,
        'data': null,
        'callback': function (data) {
            $('.prd_manufacture-body').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_delete_manufacture($id, $page) {
    var conf = confirm('B???n ch???c ch???n mu???n x??a Nh?? s???n xu???t s???n ph???m n??y!');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_delete_manufacture/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '0') {
                    $('.ajax-error-ct').html('L???i! kh??ng th??? x??a Nh?? s???n xu???t s???n ph???m n??y').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.ajax-success-ct').html('X??a lo???i s???n ph???m th??nh c??ng.').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_paging_manufacture($page);
                    cms_load_listmanufacture();
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_update_prdmanufacture($id) {
    'use strict';
    var $prd_manuf_name = $.trim($('.edit_prd_manuf_name-' + $id).val());
    if ($prd_manuf_name.length == 0) {
        alert('Nh???p t??n Nh?? s???n xu???t s???n ph???m.');
    } else {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_update_prdmanufacture/' + $id,
            'data': {'data': {'prd_manuf_name': $prd_manuf_name}},
            'callback': function (data) {
                if (data == '1') {
                    cms_paging_manufacture(1);
                    cms_load_listgroup();
                    $('.ajax-success-ct').html('C???p nh???t Nh?? s???n xu???t s???n ph???m th??nh c??ng.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.ajax-error-ct').html('T??n Nh?? s???n xu???t ???? c?? trong h??? th???ng. Vui l??ng ch???n t??n kh??c.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_create_group($cont) {
    'use strict';
    var $prd_group_name = $.trim($('#prd_group_name').val());
    var $parentid = $('#parentid').val();
    var $data = {'data': {'prd_group_name': $prd_group_name, 'parentid': $parentid}};
    if ($parentid == 1) $data = {'data': {'prd_group_name': $prd_group_name}};
    if ($prd_group_name.length == 0) {
        alert('Nh???p t??n danh m???c.');
    } else {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_create_group',
            'data': $data,
            'callback': function (data) {
                if (data == '1') {
                    cms_paging_group(1);
                    cms_load_listgroup();
                    $('.ajax-success-ct').html('T???o danh m???c th??nh c??ng.').parent().fadeIn().delay(1000).fadeOut('slow');
                    $('#prd_group_name').val('');
                    $('#parentid').val('');
                    if ($cont == 1)
                        $('.btn-close').trigger('click');
                } else if (data == '0') {
                    $('.ajax-error-ct').html('T??n danh m???c c??ng c???p ???? t???n t???i trong h??? th???ng. Vui l??ng ch???n t??n kh??c.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.ajax-error-ct').html('Opps! Something went wrong. please try again!').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_load_listgroup() {
    var $param = {
        'type': 'POST',
        'url': 'product/cms_load_listgroup',
        'data': null,
        'callback': function (data) {
            $('#prd_group_id').html(data);
            cms_load_listgroup_withoutCreate();
            cms_product_group_show();
        }
    };
    cms_adapter_ajax($param);
}

function cms_load_listgroup_withoutCreate() {
    var $param = {
        'type': 'POST',
        'url': 'product/cms_load_listgroup_withoutCreate',
        'data': null,
        'callback': function (data) {
            $('#parentid').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_load_listmanufacture() {
    var $param = {
        'type': 'POST',
        'url': 'product/cms_load_listmanufacture',
        'data': null,
        'callback': function (data) {
            $('#prd_manufacture_id').html(data);
            cms_product_manufacture_show();
        }
    };
    cms_adapter_ajax($param);
}

function cms_save_item_prdGroup($id) {
    'use strict';
    var $prd_group_name = $.trim($('.edit_prd_group_name-' + $id).val());
    if ($prd_group_name.length == 0) {
        alert('Nh???p t??n danh m???c s???n ph???m.');
    } else {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_save_item_prdGroup/' + $id,
            'data': {'data': {'prd_group_name': $prd_group_name}},
            'callback': function (data) {
                if (data == '1') {
                    cms_paging_group(1);
                    cms_load_listgroup();
                    $('.ajax-success-ct').html('C???p nh???t danh m???c th??nh c??ng.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.ajax-error-ct').html('T??n danh m???c ???? c?? trong h??? th???ng. Vui l??ng ch???n t??n kh??c.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_delete_Group($id, $page) {
    'use strict';
    var conf = confirm('B???n ch???c ch???n mu???n x??a danh m???c n??y?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_delete_Group/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    cms_paging_group($page);
                    $('.ajax-success-ct').html('X??a danh m???c th??nh c??ng.').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_load_listgroup();
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else if (data == '2') {
                    if (confirm('Danh m???c n??y ???? c?? ch???a s???n ph???m, B???n c?? ch???c ch???n mu???n x??a?')) {
                        var $param = {
                            'type': 'POST',
                            'url': 'product/cms_delete_Group_WithProduct/' + $id,
                            'data': null,
                            'callback': function (data) {
                                if (data == '1') {
                                    cms_paging_group($page);
                                    cms_load_listgroup();
                                    $('.ajax-success-ct').html('X??a danh m???c th??nh c??ng.').parent().fadeIn().delay(1000).fadeOut('slow');
                                } else {
                                    $('.ajax-error-ct').html(data).parent().fadeIn().delay(1000).fadeOut('slow');
                                }
                            }
                        };
                        cms_adapter_ajax($param);
                    }
                } else {
                    $('.ajax-error-ct').html(data).parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_add_product(type) {
    'use strict';
    var $store_id = $('#store-id').val();
    var $code = $.trim($('#prd_code').val());
    var $name = $.trim($('#prd_name').val());
    var $sls = $.trim($('#prd_sls').val());
    var $inventory = cms_get_valCheckbox('prd_inventory', 'id');
    var $allownegative = cms_get_valCheckbox('prd_allownegative', 'id');
    var $origin_price = cms_decode_currency_format($('#prd_origin_price').val());
    var $sell_price = cms_decode_currency_format($('#prd_sell_price').val());
    var $group_id = $('#prd_group_id').val();
    var $manufacture_id = $('#prd_manufacture_id').val();
    var $vat = $('#prd_vat').val();
    var $img_url;
    var $img_afurl = $('#prd_image_urls').attr('src');
    $img_url = (typeof $img_afurl == 'undefined' ) ? '' : $img_afurl;
    var $description = CKEDITOR.instances['ckeditor'].getData();
    var $display_wb = cms_get_valCheckbox('display_website', 'id');
    var $new = cms_get_valCheckbox('prd_new', 'id');
    var $hot = cms_get_valCheckbox('prd_hot', 'id');
    var $highlight = cms_get_valCheckbox('prd_highlight', 'id');
    if ($name.length == 0) {
        $('.ajax-error-ct').html('Vui l??ng nh???p t??n s???n ph???m.').parent().fadeIn().delay(1000).fadeOut('slow');
    } else {
        var $data = {
            'data': {
                'prd_name': $name,
                'prd_code': $code,
                'prd_sls': $sls,
                'prd_inventory': $inventory,
                'prd_allownegative': $allownegative,
                'prd_origin_price': $origin_price,
                'prd_sell_price': $sell_price,
                'prd_group_id': $group_id,
                'prd_manufacture_id': $manufacture_id,
                'prd_vat': $vat,
                'prd_image_url': $img_url,
                'prd_descriptions': $description,
                'display_website': $display_wb,
                'prd_new': $new,
                'prd_hot': $hot,
                'prd_highlight': $highlight
            }
        };
        var $param = {
            'type': 'POST',
            'url': 'product/cms_add_product/' + $store_id,
            'data': $data,
            'callback': function (data) {
                if (data == '1') {
                    if (type == 'save') {
                        $('.ajax-success-ct').html('T???o s???n ph???m ' + $name + ' th??nh c??ng.').parent().fadeIn().delay(1000).fadeOut('slow');
                        setTimeout(function () {
                            $('.btn-back').trigger('click');
                        }, 2000);
                    } else {
                        $('.ajax-success-ct').html('T???o s???n ph???m ' + $name + ' th??nh c??ng.').parent().fadeIn().delay(1000).fadeOut('slow');
                        $('.products').find('input:text').val('');
                        $('.products').find('input:checkbox').prop('checked', false);
                    }
                } else {
                    $('.ajax-error-ct').html(data).parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_update_product($id) {
    'use strict';
    var $name = $.trim($('#prd_name').val());
    var $sls = $.trim($('#prd_sls').val());
    var $inventory = cms_get_valCheckbox('prd_inventory', 'id');
    var $allownegative = cms_get_valCheckbox('prd_allownegative', 'id');
    var $origin_price = cms_decode_currency_format($('#prd_origin_price').val());
    var $sell_price = cms_decode_currency_format($('#prd_sell_price').val());
    var $group_id = $('#prd_group_id').val();
    var $manufacture_id = $('#prd_manufacture_id').val();
    var $img_afurl = $('#prd_image_urls').attr('src');
    var $img_url = (typeof $img_afurl == 'undefined' ) ? '' : $img_afurl;
    var $description = CKEDITOR.instances['ckeditor'].getData();
    var $display_wb = cms_get_valCheckbox('display_website', 'id');
    var $new = cms_get_valCheckbox('prd_new', 'id');
    var $hot = cms_get_valCheckbox('prd_hot', 'id');
    var $highlight = cms_get_valCheckbox('prd_highlight', 'id');
    if ($name.length == 0) {
        $('.ajax-error-ct').html('Vui l??ng nh???p t??n s???n ph???m.').parent().fadeIn().delay(1000).fadeOut('slow');
    } else {
        var $data = {
            'data': {
                'prd_name': $name,
                'prd_sls': $sls,
                'prd_inventory': $inventory,
                'prd_allownegative': $allownegative,
                'prd_origin_price': $origin_price,
                'prd_sell_price': $sell_price,
                'prd_group_id': $group_id,
                'prd_manufacture_id': $manufacture_id,
                'prd_image_url': $img_url,
                'prd_descriptions': $description,
                'display_website': $display_wb,
                'prd_new': $new,
                'prd_hot': $hot,
                'prd_highlight': $highlight
            }
        };
        var $param = {
            'type': 'POST',
            'url': 'product/cms_update_product/' + $id,
            'data': $data,
            'callback': function (data) {
                if (data == '1') {
                    $('.ajax-success-ct').html('C???p nh???t s???n ph???m ' + $name + ' th??nh c??ng.').parent().fadeIn().delay(1000).fadeOut('slow');
                    setTimeout(function () {
                        $('.btn-back').trigger('click');
                    }, 2000);
                } else {
                    $('.ajax-error-ct').html(data).parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_paging_listcustomer($page) {
    $keyword = $('.txt-scustomer').val();
    $option = $('#cus-option').val();
    $data = {'data': {'option': $option, 'keyword': $keyword}};
    var $param = {
        'type': 'POST',
        'url': 'customer/cms_paging_listcustomer/' + $page,
        'data': $data,
        'callback': function (data) {
            $('.cus-body').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_delete_product($id, $page) {
    var conf = confirm('B???n ch???c ch???n mu???n x??a s???n ph???m n??y?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_delete_product/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    $('.ajax-success-ct').html('X??a s???n ph???m th??nh c??ng.').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_paging_product($page);
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_delete_product_bydetail($id) {
    var conf = confirm('B???n ch???c ch???n mu???n x??a s???n ph???m n??y?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_delete_product/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    $('.ajax-success-ct').html('X??a s???n ph???m th??nh c??ng.').parent().fadeIn().delay(1000).fadeOut('slow');
                    setTimeout(function () {
                        cms_javascript_redirect(cms_javascrip_fullURL());
                    }, 2000);
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_restore_product_deleted_bydetail($id) {
    var conf = confirm('B???n ch???c ch???n mu???n kh??i ph???c s???n ph???m n??y?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_restore_product_deleted/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    $('.ajax-success-ct').html('Kh??i ph???c s???n ph???m th??nh c??ng.').parent().fadeIn().delay(1000).fadeOut('slow');
                    setTimeout(function () {
                        cms_javascript_redirect(cms_javascrip_fullURL());
                    }, 2000);
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_restore_product_deleted($id, $page) {
    var conf = confirm('B???n ch???c ch???n mu???n kh??i ph???c s???n ph???m n??y?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_restore_product_deleted/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    $('.ajax-success-ct').html('Kh??i ph???c s???n ph???m th??nh c??ng.').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_paging_product($page);
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_restore_product_deactivated_bydetail($id) {
    var conf = confirm('B???n ch???c ch???n mu???n kh??i ph???c s???n ph???m n??y?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_restore_product_deactivated/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    $('.ajax-success-ct').html('Kh??i ph???c s???n ph???m th??nh c??ng.').parent().fadeIn().delay(1000).fadeOut('slow');
                    setTimeout(function () {
                        cms_javascript_redirect(cms_javascrip_fullURL());
                    }, 2000);
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_restore_product_deactivated($id, $page) {
    var conf = confirm('B???n ch???c ch???n mu???n kh??i ph???c s???n ph???m n??y?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_restore_product_deactivated/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    $('.ajax-success-ct').html('Kh??i ph???c s???n ph???m th??nh c??ng.').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_paging_product($page);
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_deactivate_product($id, $page) {
    var conf = confirm('B???n c?? th???c s??? mu???n ng???ng kinh doanh s???n ph???m n??y kh??ng?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_deactivate_product/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    $('.ajax-success-ct').html('Ng???ng kinh doanh s???n ph???m th??nh c??ng.').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_paging_product($page);
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_deactivate_product_bydetail($id) {
    var conf = confirm('B???n c?? th???c s??? mu???n ng???ng kinh doanh s???n ph???m n??y kh??ng?');
    if (conf) {
        var $name = $('td.prd_name').text();
        var $param = {
            'type': 'POST',
            'url': 'product/cms_deactivate_product/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    $('.ajax-success-ct').html('Ng???ng kinh doanh s???n ph???m th??nh c??ng.').parent().fadeIn().delay(1000).fadeOut('slow');
                    setTimeout(function () {
                        cms_javascript_redirect(cms_javascrip_fullURL());
                    }, 2000);
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_detail_product($id) {
    var $param = {
        'type': 'POST',
        'url': 'product/cms_detail_product/' + $id,
        'data': null,
        'callback': function (data) {
            $('.products').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_detail_product_deleted($id) {
    var $param = {
        'type': 'POST',
        'url': 'product/cms_detail_product_deleted/' + $id,
        'data': null,
        'callback': function (data) {
            $('.products').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_detail_product_deactivated($id) {
    var $param = {
        'type': 'POST',
        'url': 'product/cms_detail_product_deactivated/' + $id,
        'data': null,
        'callback': function (data) {
            $('.products').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_clone_product($id) {
    var $param = {
        'type': 'POST',
        'url': 'product/cms_clone_product/' + $id,
        'data': null,
        'callback': function (data) {
            $('.products').html(data);
            cms_product_group_show();
            cms_product_manufacture_show();
        }
    };
    cms_adapter_ajax($param);
}

function cms_edit_product($id) {
    var $param = {
        'type': 'POST',
        'url': 'product/cms_edit_product/' + $id,
        'data': null,
        'callback': function (data) {
            $('.products').html(data);
            cms_product_group_show();
            cms_product_manufacture_show();
        }
    };
    cms_adapter_ajax($param);
}

/*========================== ORDER ============================*/

function cms_vsell_order() {
    var $param = {
        'type': 'POST',
        'url': 'orders/cms_vsell_order/',
        'data': null,
        'callback': function (data) {
            $('.orders').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_product_search() {
    $("body").on('keyup', '#product-search', function (e) {
        if (e.keyCode == 13) {
            cms_paging_product(1);
        }
    });
}

function cms_change_store() {
    $('#store-id').on('change', function () {
        var store_id = $("#store-id").val();
        var $param = {
            'type': 'POST',
            'url': 'account/cms_change_store/' + store_id,
            'callback': function (data) {
                if (data == '1') {
                    var link = window.location.pathname;
                    if (link.indexOf('orders') !== -1) {
                        if ($('#search-option-1').val() >= 0)
                            cms_paging_order(1);
                    }
                    else if (link.indexOf('product') !== -1) {
                        if ($('#search-option-1').val() >= 0)
                            cms_paging_order(1);
                    }
                    else if (link.indexOf('inventory') !== -1) {
                        if ($('#option_inventory').val() >= 0)
                            cms_paging_inventory(1);
                    }
                    else if (link.indexOf('import') !== -1) {
                        if ($('#search-option-1').val() >= 0)
                            cms_paging_order(1);
                    }
                }
            }
        };
        cms_adapter_ajax($param);
    });
}

function cms_input_search() {
    $('#search-option-1').on('change', function () {
        cms_paging_input(1);
    });

    $("body").on('keyup', '#input-search', function (e) {
        if (e.keyCode == 13) {
            cms_paging_input(1);
        }
    });
}

function cms_order_search() {
    $('#search-option-1').on('change', function () {
        cms_paging_order(1);
    });

    $("body").on('keyup', '#order-search', function (e) {
        if (e.keyCode == 13) {
            cms_paging_order(1);
        }
    });
}

function cms_revenue_search() {
    $('#search-option-1').on('change', function () {
        cms_paging_revenue(1);
    });
    $('#search-option-2').on('change', function () {
        cms_paging_revenue(1);
    });
    $('#search-option-3').on('change', function () {
        cms_paging_revenue(1);
    });
    $('#search-option-4').on('change', function () {
        cms_paging_revenue(1);
    });
    $('[name=revenue]').on('change', function () {
        cms_paging_revenue(1);
    });
}

function cms_profit_search() {
    $('#search-option-1').on('change', function () {
        cms_paging_profit(1);
    });
    $('#search-option-2').on('change', function () {
        cms_paging_profit(1);
    });
    $('#search-option-3').on('change', function () {
        cms_paging_profit(1);
    });
    $('#search-option-4').on('change', function () {
        cms_paging_profit(1);
    });
    $('[name=profit]').on('change', function () {
        cms_paging_profit(1);
    });
}

function cms_autocomplete_enter_sell() {
    $barcode = $("#search-pro-box").val();
    var $param = {
        'type': 'POST',
        'url': 'orders/cms_check_barcode/' + $barcode,
        'data': null,
        'callback': function (data) {
            if (data > 0) {
                cms_select_product_sell(data);
                $(this).val('');
            }
        }
    };
    cms_adapter_ajax($param);
}

function cms_autocomplete_enter_import() {
    $barcode = $("#search-pro-box").val();
    var $param = {
        'type': 'POST',
        'url': 'orders/cms_check_barcode/' + $barcode,
        'data': null,
        'callback': function (data) {
            if (data > 0) {
                cms_select_product_import(data);
                $(this).val('');
            }
        }
    };
    cms_adapter_ajax($param);
}

function cms_inventory_search() {
    $("body").on('keyup', '.txt-sinventory', function (e) {
        if (e.keyCode == 13) {
            cms_paging_inventory(1);
        }
    });
}

function cms_customer_search() {
    $("body").on('keyup', '.txt-scustomer', function (e) {
        if (e.keyCode == 13) {
            cms_paging_listcustomer(1);
        }
    });
}

function cms_supplier_search() {
    $("body").on('keyup', '.txt-ssupplier', function (e) {
        if (e.keyCode == 13) {
            cms_paging_supplier(1);
        }
    });
}

function cms_product_group_show() {
    $('#prd_group_id').change(function () { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if (opval == "product_group") { //Compare it and if true
            $('#list-prd-group').modal("show"); //Open Modal
        }
    });
}

function cms_product_manufacture_show() {
    $('#prd_manufacture_id').change(function () { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if (opval == "product_manufacture") { //Compare it and if true
            $('#list-prd-manufacture').modal("show"); //Open Modal
        }
    });
}

function cms_search_box_customer() {
    $("body").on('keyup ajaxComplete', '#search-box-cys', function () {
        $('#cys-suggestion-box').show();
        $key = $(this).val();
        if ($key.length == 0) {
            $('.search-cys-inner').html('Kh??ng c?? k???t qu??? ph?? h???p').parent().hide().delay(1000);
        } else {
            var $param = {
                'type': 'POST',
                'url': 'orders/cms_search_box_customer/',
                'data': {'data': {'keyword': $key}},
                'callback': function (data) {
                    if (data.length != 0) {
                        $('.search-cys-inner').html(data);
                    } else {
                        $('.search-cys-inner').html('Kh??ng c?? k???t qu??? ph?? h???p');
                    }
                }
            };
            cms_adapter_ajax($param);
        }
    });
}

function cms_search_box_sup() {
    $("body").on('keyup ajaxComplete', '#search-box-mas', function () {
        $('#mas-suggestion-box').show();
        $keyword = $(this).val();
        if ($keyword.length == 0) {
            $('.search-mas-inner').html('Kh??ng c?? k???t qu??? ph?? h???p').parent().hide().delay(1000);
        } else {

            var $param = {
                'type': 'POST',
                'url': 'import/cms_search_box_sup/' + $keyword,
                'data': null,
                'callback': function (data) {
                    if (data.length != 0) {
                        $('.search-mas-inner').html(data);
                    } else {
                        $('.search-mas-inner').html('Kh??ng c?? k???t qu??? ph?? h???p');
                    }
                }
            };
            cms_adapter_ajax($param);
        }
    });
}

function cms_select_product_sell($id) {
    if ($('tbody#pro_search_append tr').length != 0) {
        $flag = 0;
        $('tbody#pro_search_append tr').each(function () {
            $id_temp = $(this).attr('data-id');
            if ($id == $id_temp) {
                value_input = $(this).find('input.quantity_product_order');
                value_input.val(parseInt(value_input.val()) + 1);
                $flag = 1;
                cms_load_infor_order();
                return false;
            }
        });
        if ($flag == 0) {
            var $seq = parseInt($('td.seq').last().text()) + 1;
            var $param = {
                'type': 'POST',
                'url': 'orders/cms_select_product/',
                'data': {'id': $id, 'seq': $seq},
                'callback': function (data) {
                    $('#pro_search_append').append(data);
                    cms_load_infor_order();
                }
            };
            cms_adapter_ajax($param);
        }
    } else {
        var $param = {
            'type': 'POST',
            'url': 'orders/cms_select_product/',
            'data': {'id': $id, 'seq': 1},
            'callback': function (data) {
                $('#pro_search_append').append(data);
                cms_load_infor_order();
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_select_product_import($id) {
    if ($('tbody#pro_search_append tr').length != 0) {
        $flag = 0;
        $('tbody#pro_search_append tr').each(function () {
            $id_temp = $(this).attr('data-id');
            if ($id == $id_temp) {
                value_input = $(this).find('input.quantity_product_import');
                value_input.val(parseInt(value_input.val()) + 1);
                $flag = 1;
                cms_load_infor_import();
                return false;
            }
        });
        if ($flag == 0) {
            var $seq = parseInt($('td.seq').last().text()) + 1;
            var $param = {
                'type': 'POST',
                'url': 'import/cms_select_product/',
                'data': {'id': $id, 'seq': $seq},
                'callback': function (data) {
                    $('#pro_search_append').append(data);
                    cms_load_infor_import();
                }
            };
            cms_adapter_ajax($param);
        }
    } else {
        var $param = {
            'type': 'POST',
            'url': 'import/cms_select_product/',
            'data': {'id': $id, 'seq': 1},
            'callback': function (data) {
                $('#pro_search_append').append(data);
                cms_load_infor_import();
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_selected_cys($id) {
    $name = $('li.data-cys-name-' + $id).text();
    $("#search-box-cys").prop('readonly', true).attr('data-id', $id).val($name);
    $(".del-cys").html('<i class="fa fa-minus-circle" aria-hidden="true"></i>');
    $('#cys-suggestion-box').hide();
}

function cms_selected_mas($id) {
    $name = $('li.data-cys-name-' + $id).text();
    $("#search-box-mas").prop('readonly', true).attr('data-id', $id).val($name);
    $(".del-mas").html('<i class="fa fa-minus-circle" aria-hidden="true"></i>');
    $('#mas-suggestion-box').hide();
}

function cms_save_orders(type) {
    if ($('tbody#pro_search_append tr').length == 0) {
        $('.ajax-error-ct').html('Xin vui l??ng ch???n ??t nh???t 1 s???n ph???m c???n b??n tr?????c khi thanh to??n. Xin c???m ??n!').parent().fadeIn().delay(1000).fadeOut('slow');
    } else {
        $customer_id = $('#search-box-cys').attr('data-id');
        $store_id = $('#store-id').val();
        $date = $('#date-order').val();
        $note = $('#note-order').val();
        $sale_id = $('#sale_id').val();
        $payment_method = $("input:radio[name ='method-pay']:checked").val();
        $discount = cms_decode_currency_format(typeof $('input.discount-order').val() === 'undefined' ? 0 : $('input.discount-order').val());
        $customer_pay = cms_decode_currency_format($('.customer-pay').val());

        $detail = [];
        $('tbody#pro_search_append  tr').each(function () {
            $id = $(this).attr('data-id');
            $value_input = $(this).find('input.quantity_product_order').val();
            $detail.push(
                {id: $id, quantity: $value_input, price: 0, discount: 0}
            );
        });
        if (type == "0")
            $order_status = 0;
        else
            $order_status = 1;

        $data = {
            'data': {
                'sale_id': $sale_id,
                'customer_id': $customer_id,
                'sell_date': $date,
                'notes': $note,
                'payment_method': $payment_method,
                'coupon': $discount,
                'customer_pay': $customer_pay,
                'detail_order': $detail,
                'order_status': $order_status
            }
        };

        var $param = {
            'type': 'POST',
            'url': 'orders/cms_save_orders/' + $store_id,
            'data': $data,
            'callback': function (data) {
                if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    if (type == 1) {
                        $('.ajax-success-ct').html('???? l??u th??nh c??ng ????n h??ng.').parent().fadeIn().delay(1000).fadeOut('slow');
                        setTimeout(function () {
                            $('.btn-back').delay('1000').trigger('click');
                        }, 1000);
                    } else if (type == 0) {
                        $('.ajax-success-ct').html('???? l??u t???m th??nh c??ng ????n h??ng.').parent().fadeIn().delay(1000).fadeOut('slow');
                        cms_vsell_order();
                    } else if (type == 2) {
                        cms_print_order_in_create(1, data);
                    } else if (type == 3) {
                        location.reload();
                    } else if (type == 4) {
                        cms_print_order_in_pos(1, data);
                    }
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_del_temp_order($id, $page) {
    var conf = confirm('B???n ch???c ch???n mu???n x??a ????n h??ng n??y?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'orders/cms_del_temp_order/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    cms_paging_order($page);
                    $('.ajax-success-ct').html('X??a ????n h??ng th??nh c??ng.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_del_order($id, $page) {
    var conf = confirm('B???n ch???c ch???n mu???n x??a v??nh vi???n ????n h??ng n??y?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'orders/cms_del_order/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    cms_paging_order($page);
                    $('.ajax-success-ct').html('X??a ????n h??ng v??nh vi???n th??nh c??ng.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_del_order_in_customer($id, $page) {
    var conf = confirm('B???n ch???c ch???n mu???n x??a ????n h??ng n??y?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'orders/cms_del_temp_order/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    cms_paging_order_by_customer_id($page);
                    $('.ajax-success-ct').html('X??a ????n h??ng th??nh c??ng.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_del_input_in_supplier($id, $page) {
    var conf = confirm('B???n ch???c ch???n mu???n x??a phi???u nh???p n??y?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'import/cms_del_temp_import/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    cms_paging_input_by_supplier_id($page);
                    $('.ajax-success-ct').html('X??a phi???u nh???p th??nh c??ng.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_detail_order($id) {
    var $param = {
        'type': 'POST',
        'url': 'orders/cms_detail_order/',
        'data': {'id': $id},
        'callback': function (data) {
            $('.orders').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_show_detail_order($id) {
    $('#tr-detail-order-' + $id).toggle(200);
    $('.i-detail-order-' + $id).toggle();
}

function cms_show_list_order($id) {
    $('#tr-list-order-' + $id).toggle(200);
    $('.i-list-order-' + $id).toggle();
}

function cms_show_detail_input($id) {
    $('#tr-detail-input-' + $id).toggle(200);
    $('.i-detail-input-' + $id).toggle();
}

function cms_detail_order_in_customer($id) {
    var $param = {
        'type': 'POST',
        'url': 'customer/cms_detail_order_in_customer/',
        'data': {'id': $id},
        'callback': function (data) {
            $('.orders-main-body').html(data);
            $('#order_info').text('Chi ti???t ????n h??ng');
        }
    };
    cms_adapter_ajax($param);
}

function cms_detail_input_in_supplier($id) {
    var $param = {
        'type': 'POST',
        'url': 'supplier/cms_detail_input_in_supplier/',
        'data': {'id': $id},
        'callback': function (data) {
            $('.inputs-main-body').html(data);
            $('#input_info').text('Chi ti???t phi???u nh???p');
        }
    };
    cms_adapter_ajax($param);
}

/*=================== Module Imports ===========================*/
function cms_vsell_import() {
    var $param = {
        'type': 'POST',
        'url': 'import/cms_vsell_import/',
        'data': null,
        'callback': function (data) {
            $('.orders').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_save_import(type) {
    if ($('tbody#pro_search_append tr').length == 0) {
        $('.ajax-error-ct').html('Xin vui l??ng ch???n ??t nh???t 1 s???n ph???m tr?????c khi l??u h??a ????n nh???p. Xin c???m ??n!').parent().fadeIn().delay(1000).fadeOut('slow');
    } else {
        $store_id = $('#store-id').val();
        $supplier_id = $('#search-box-mas').attr('data-id');
        $date = $('#date-order').val();
        $note = $('#note-order').val();
        $payment_method = $("input:radio[name ='method-pay']:checked").val();
        $discount = cms_decode_currency_format($('input.discount-import').val());
        $khachdua = cms_decode_currency_format($('.customer-pay').val());
        $detail = [];
        $('tbody#pro_search_append tr').each(function () {
            $price = cms_decode_currency_format($(this).find('input.price-order').val());
            $id = $(this).attr('data-id');
            $value_input = $(this).find('input.quantity_product_import').val();
            $detail.push(
                {id: $id, quantity: $value_input, price: $price}
            );
        });
        if (type == "0")
            $input_status = 0;
        else
            $input_status = 1;

        $data = {
            'data': {
                'supplier_id': $supplier_id,
                'input_date': $date,
                'notes': $note,
                'payment_method': $payment_method,
                'discount': $discount,
                'payed': $khachdua,
                'detail_input': $detail,
                'input_status': $input_status
            }
        };

        var $param = {
            'type': 'POST',
            'url': 'import/cms_save_import/' + $store_id,
            'data': $data,
            'callback': function (data) {
                if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    if (type == 1) {
                        $('.ajax-success-ct').html('???? l??u th??nh c??ng phi???u nh???p.').parent().fadeIn().delay(1000).fadeOut('slow');
                        setTimeout(function () {
                            $('.btn-back').delay('1000').trigger('click');
                        }, 1000);
                    } else if (type == 0) {
                        $('.ajax-success-ct').html('???? l??u th??nh c??ng phi???u nh???p t???m.').parent().fadeIn().delay(1000).fadeOut('slow');
                        cms_vsell_import();
                    } else {
                        cms_print_input_in_create(3, data);

                    }
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_selboxstock() {
    "use strict";

    var $param = {
        'type': 'POST',
        'url': 'ajax/cms_selboxstock',
        'data': null,
        'callback': function (data) {
            if (data != '0') {
                $('.stock-selbox').html(data);
            } else {
                $('.stock-selbox').html($html);
            }
        }
    };
    cms_adapter_ajax($param);
}

function cms_del_temp_import($id, $page) {
    var conf = confirm('B???n ch???c ch???n mu???n x??a phi???u nh???p n??y?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'import/cms_del_temp_import/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    cms_paging_input($page);
                    $('.ajax-success-ct').html('X??a phi???u nh???p th??nh c??ng.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_del_import($id, $page) {
    var conf = confirm('B???n ch???c ch???n mu???n x??a v??nh vi???n phi???u nh???p n??y?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'import/cms_del_import/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    cms_paging_input($page);
                    $('.ajax-success-ct').html('X??a v??nh vi???n phi???u nh???p th??nh c??ng.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_edit_import($id) {
    var $param = {
        'type': 'POST',
        'url': 'import/cms_edit_import/',
        'data': {'id': $id},
        'callback': function (data) {
            $('.orders').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_paging_inventory($page) {
    $store_id = $('#store-id').val();
    $keyword = $('.txt-sinventory').val();
    $option1 = $('#prd_group_id').val()
    $option2 = $('#prd_manufacture_id').val();
    $option3 = $('#option_inventory').val();
    $data = {
        'data': {
            'keyword': $keyword,
            'option1': $option1,
            'option2': $option2,
            'option3': $option3,
            'store_id': $store_id
        }
    };
    var $param = {
        'type': 'POST',
        'url': 'inventory/cms_paging_inventory/' + $page,
        'data': $data,
        'callback': function (data) {
            $('.inventory-main-body').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_paging_product($page) {
    $keyword = $('#product-search').val();
    $option1 = $('#search-option-1').val();
    $option2 = $('#prd_group_id').val();
    $option3 = $('#prd_manufacture_id').val();
    $data = {'data': {'option1': $option1, 'option2': $option2, 'option3': $option3, 'keyword': $keyword}};
    var $param = {
        'type': 'POST',
        'url': 'product/cms_paging_product/' + $page,
        'data': $data,
        'callback': function (data) {
            $('.product-main-body').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_paging_order($page) {
    $keyword = $('#order-search').val();
    $option1 = $('#search-option-1').val();
    $customer_id = -1;

    if ($('#customer-id').val() != null)
        $customer_id = $('#customer-id').val();

    $date_from = $('#search-date-from').val();
    $date_to = $('#search-date-to').val();
    $data = {
        'data': {
            'option1': $option1,
            'keyword': $keyword,
            'date_from': $date_from,
            'date_to': $date_to,
            'customer_id': $customer_id
        }
    };
    var $param = {
        'type': 'POST',
        'url': 'orders/cms_paging_order/' + $page,
        'data': $data,
        'callback': function (data) {
            $('.orders-main-body').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_paging_revenue($page) {
    $type = $('[name=revenue]:checked').val();
    $option1 = $('#search-option-1').val();
    $option2 = $('#search-option-2').val();
    $option3 = $('#search-option-3').val();
    $option4 = $('#search-option-4').val();
    $date_from = $('#search-date-from').val();
    $date_to = $('#search-date-to').val();
    $data = {
        'data': {
            'type': $type,
            'option1': $option1,
            'option2': $option2,
            'option3': $option3,
            'option4': $option4,
            'date_from': $date_from,
            'date_to': $date_to
        }
    };
    var $param = {
        'type': 'POST',
        'url': 'revenue/cms_paging_revenue/' + $page,
        'data': $data,
        'callback': function (data) {
            $('.revenue-main-body').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_paging_profit($page) {
    $type = $('[name=profit]:checked').val();
    $option1 = $('#search-option-1').val();
    $option2 = $('#search-option-2').val();
    $option3 = $('#search-option-3').val();
    $option4 = $('#search-option-4').val();
    $date_from = $('#search-date-from').val();
    $date_to = $('#search-date-to').val();
    $data = {
        'data': {
            'type': $type,
            'option1': $option1,
            'option2': $option2,
            'option3': $option3,
            'option4': $option4,
            'date_from': $date_from,
            'date_to': $date_to
        }
    };
    var $param = {
        'type': 'POST',
        'url': 'profit/cms_paging_profit/' + $page,
        'data': $data,
        'callback': function (data) {
            $('.profit-main-body').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_paging_order_by_customer_id($page) {
    var $ids = $('.tr-item-customer').attr('id');
    var $id = parseInt($ids.replace(/[^\d.]/g, ''));

    if ($id != null)
        $customer_id = $id;

    $data = {
        'data': {
            'customer_id': $customer_id
        }
    };
    var $param = {
        'type': 'POST',
        'url': 'customer/cms_paging_order_by_customer_id/' + $page,
        'data': $data,
        'callback': function (data) {
            $('.orders-main-body').html(data);
            $('#order_info').text('L???ch s??? mua h??ng');
        }
    };
    cms_adapter_ajax($param);
}

function cms_paging_input_by_supplier_id($page) {
    var $ids = $('.tr-item-sup').attr('id');
    var $id = parseInt($ids.replace(/[^\d.]/g, ''));

    if ($id != null)
        $supplier_id = $id;

    $data = {
        'data': {
            'supplier_id': $supplier_id
        }
    };
    var $param = {
        'type': 'POST',
        'url': 'supplier/cms_paging_input_by_supplier_id/' + $page,
        'data': $data,
        'callback': function (data) {
            $('.inputs-main-body').html(data);
            $('#input_info').text('L???ch s??? nh???p h??ng');
        }
    };
    cms_adapter_ajax($param);
}

function cms_paging_input($page) {
    $keyword = $('#input-search').val();
    $option1 = $('#search-option-1').val();
    //$option2 = $('#search-option-2').val();
    //$option3 = $('#search-option-3').val();
    $date_from = $('#search-date-from').val();
    $date_to = $('#search-date-to').val();
    $data = {'data': {'option1': $option1, 'keyword': $keyword, 'date_from': $date_from, 'date_to': $date_to}};
    var $param = {
        'type': 'POST',
        'url': 'import/cms_paging_input/' + $page,
        'data': $data,
        'callback': function (data) {
            $('.imports-main-body').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_paging_group($page) {
    var $param = {
        'type': 'POST',
        'url': 'product/cms_paging_group/' + $page,
        'data': null,
        'callback': function (data) {
            $('.prd_group-body').html(data);
        }
    };
    cms_adapter_ajax($param);
}


function cms_loadListproOption() {
    $('#search-option-1').on('change', function () {
        cms_paging_product(1);
    });

    $('#prd_group_id').on('change', function () {
        var opval = $(this).val(); //Get value from select element
        if (opval == "product_group") { //Compare it and if true
            $('#list-prd-group').modal("show"); //Open Modal
        } else {
            cms_paging_product(1);
        }
    });

    $('#prd_manufacture_id').on('change', function () {
        var opval = $(this).val(); //Get value from select element
        if (opval == "product_manufacture") { //Compare it and if true
            $('#list-prd-manufacture').modal("show"); //Open Modal
        } else {
            cms_paging_product(1);
        }
    });
}

function cms_loadListInvOption() {
    $('#option_inventory').on('change', function () {
        cms_paging_inventory(1);
    });

    $('#prd_group_id').on('change', function () {
        cms_paging_inventory(1);
    });

    $('#prd_manufacture_id').on('change', function () {
        cms_paging_inventory(1);
    });
}

function cms_loadListCusOption() {
    $('#cus-option').on('change', function () {
        cms_paging_listcustomer(1);
    });
}

function cms_loadListSupOption() {
    $('#sup-option').on('change', function () {
        cms_paging_supplier(1);
    });
}

//Eport Exel
function cms_export_inventory() {
    return cms_javascript_redirect('inventory/ExportInventory');
}

function cms_load_infor_order() {
    $total_money = 0;
    $('tbody#pro_search_append tr').each(function () {
        $quantity_product = $(this).find('input.quantity_product_order').val();
        $price = $(this).find('td.price-order-hide').text();
        $total = $price * $quantity_product;
        $total_money += $total;
        $(this).find('td.total-money').text(cms_encode_currency_format($total));
    });
    $('div.total-money').text(cms_encode_currency_format($total_money));

    if ($('input.discount-order').val() == '')
        $discount = 0;
    else
        $discount = cms_decode_currency_format($('input.discount-order').val());

    if ($discount > $total_money) {
        $('input.discount-order').val($total_money);
        $discount = $total_money;
    }

    $total_after_discount = $total_money - $discount;
    $('.total-after-discount').text(cms_encode_currency_format($total_after_discount));
    $('input.customer-pay').val(cms_encode_currency_format($total_after_discount));
    $('div.debt').text(0);
}

function cms_load_infor_import() {
    $total_money = 0;
    $('tbody#pro_search_append tr').each(function () {
        $quantity_product = $(this).find('input.quantity_product_import').val();
        $price = cms_decode_currency_format($(this).find('input.price-order').val());
        $total = $price * $quantity_product;
        $total_money += $total;
        $(this).find('td.total-money').text(cms_encode_currency_format($total));
    });
    $('div.total-money').text(cms_encode_currency_format($total_money));

    if ($('input.discount-import').val() == '')
        $discount = 0;
    else
        $discount = cms_decode_currency_format($('input.discount-import').val());

    if ($discount > $total_money) {
        $('input.discount-import').val($total_money);
        $discount = $total_money;
    }

    $total_after_discount = $total_money - $discount;
    $('.total-after-discount').text(cms_encode_currency_format($total_after_discount));
    $('input.customer-pay').val(cms_encode_currency_format($total_after_discount));
    $('div.debt').text(0);
}

function cms_encode_currency_format(obs) {
    return obs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function cms_decode_currency_format(obs) {
    return parseInt(obs.replace(/,/g, ''));
}

function fix_height_sidebar() {
    var wdth_main = $('.main-content').height(),
        wdth_sidebar = $(".sidebar").height();
    if (wdth_main > wdth_sidebar) {
        $('.sidebar').height(wdth_main);
    }
}
function btnClick(beforClick, afterClick) {
    $("body").on('click', beforClick, function () {
        $(afterClick).trigger('click');
    });
}

function is_match(pass1, pass2) {
    if (pass1 == pass2) return true;

    return false;
}

function cms_set_current_week() {
    var curr = new Date;
    var first = curr.getDate() - curr.getDay();
    var last = first + 6;
    var firstday = new Date(curr.setDate(first)).toISOString().split('T')[0];
    var lastday = new Date(curr.setDate(last)).toISOString().split('T')[0];
    $('#search-date-from').val(firstday);
    $('#search-date-to').val(lastday);
}

function cms_set_current_month() {
    var date = new Date;
    var first = new Date(date.getFullYear(), date.getMonth(), 2);
    var last = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    var firstday = first.toISOString().split('T')[0];
    var lastday = last.toISOString().split('T')[0];
    $('#search-date-from').val(firstday);
    $('#search-date-to').val(lastday);
}

function cms_set_current_quarter() {
    var d = new Date();
    var quarter = Math.floor((d.getMonth() / 3));
    var firstDate = new Date(d.getFullYear(), quarter * 3, 1);
    $('#search-date-from').datepicker("setDate", firstDate);
    $('#search-date-to').datepicker("setDate", new Date(firstDate.getFullYear(), firstDate.getMonth() + 3, 0));
}

function cms_input_week() {
    cms_set_current_week();
    cms_paging_input(1);
}

function cms_input_month() {
    cms_set_current_month();
    cms_paging_input(1);
}

function cms_input_quarter() {
    cms_set_current_quarter();
    cms_paging_input(1);
}

function cms_order_week() {
    cms_set_current_week();
    cms_paging_order(1);
}

function cms_order_month() {
    cms_set_current_month();
    cms_paging_order(1);
}

function cms_order_quarter() {
    cms_set_current_quarter();
    cms_paging_order(1);
}

function cms_revenue_all_week() {
    cms_set_current_week();
    cms_paging_revenue(1);
}

function cms_revenue_all_month() {
    cms_set_current_month();
    cms_paging_revenue(1);
}

function cms_revenue_all_quarter() {
    cms_set_current_quarter();
    cms_paging_revenue(1);
}

function cms_profit_all_week() {
    cms_set_current_week();
    cms_paging_profit(1);
}

function cms_profit_all_month() {
    cms_set_current_month();
    cms_paging_profit(1);
}

function cms_profit_all_quarter() {
    cms_set_current_quarter();
    cms_paging_profit(1);
}

function cms_edit_usitem(id) {
    $('tr.tr-item-' + id).hide();
    cms_selboxgroup();
    $('tr.edit-tr-item-' + id).show();
}

function cms_undo_item(id) {
    $('tr.edit-tr-item-' + id).hide();
    $('tr.tr-item-' + id).show();
}

function tab_click_act(act) {
    $('.act').not(this).hide();
    $('.' + act + '-act').show();
}

function cms_javascript_redirect(url) {
    window.location.assign(url);
}
function cms_javascrip_fullURL() {
    return window.location.href;
}
function cms_edit_cusitem(obj) {
    $('.btn-hide-edit').hide();
    $('.btn-show-edit').show();
    $('.tr-item-' + obj).hide();
    $('.tr-edit-item-' + obj).show();
}
function cms_undo_cusitem(obj) {
    $('.btn-hide-edit').show();
    $('.btn-show-edit').hide();
    $('.tr-item-' + obj).show();
    $('.tr-edit-item-' + obj).hide();
}
function cms_edit_prd($module, id) {
    $('.prd_' + $module + '-body tr.tr-item-' + id).hide();
    $('.prd_' + $module + '-body tr.edit-tr-item-' + id).show();
}
function cms_get_valCheckbox(obj, type) {
    var vals = 0;
    var types = (type == 'class' ) ? '.' : '#';
    if ($(types + obj).prop('checked') == true) {
        vals = 1;
    }
    return vals;
}
Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

function cms_del_icon_click(obs, attach) {
    $('body').on('click', obs, function () {
        $(this).html('').parent().find(attach).val('').removeAttr('data-id').prop('readonly', false);
    })
}