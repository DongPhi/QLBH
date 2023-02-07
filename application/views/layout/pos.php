<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <base href="<?php echo CMS_BASE_URL; ?>" />
    <link rel="shortcut icon" type="image/png" href="public/templates/images/check.png" />
    <title>
        <?php echo isset($seo['title']) ? $seo['title'] : 'Phần mềm quản lý bán hàng'; ?>
    </title>
    <link href="public/templates/css/bootstrap.min.css" rel="stylesheet">
    <link href="public/templates/css/font-awesome.min.css" rel="stylesheet">
    <link href="public/templates/css/jquery-ui.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="public/templates/css/pos-style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
        integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!--Start of Zendesk Chat Script-->
    <script type="text/javascript">
        window.$zopim || (function (d, s) {
            var z = $zopim = function (c) { z._.push(c) }, $ = z.s =
                d.createElement(s), e = d.getElementsByTagName(s)[0]; z.set = function (o) {
                    z.set.
                        _.push(o)
                }; z._ = []; z.set._ = []; $.async = !0; $.setAttribute("charset", "utf-8");
            $.src = "https://v2.zopim.com/?2Z9j3qQJSSSIytel3Hsn5sCSk4aspfwy"; z.t = +new Date; $.
                type = "text/javascript"; e.parentNode.insertBefore($, e)
        })(document, "script");
    </script>
    <!--End of Zendesk Chat Script-->
</head>

<body>
    <header class="pos-header">
        <?php $this->load->view('common/header_pos', isset($data) ? $data : NULL); ?>
    </header>
    <section id="pos" class="main" role="main">
        <div class="main-products">
            <div class="product-results">
                <table class="table-products">
                    <tbody id="pro_search_append"></tbody>
                </table>
            </div>
            <?php
                $this->load->view('common/modal', isset($data) ? $data : NULL);
            ?>
            <div class="main-content">
                <div class="orders-act">
                    <div class="content-infor">
                        <div class="infor">
                            <span>Thông tin</span>
                        </div>
                        <div class="pos-customer">
                            <div style="position: relative;">
                                <input id="search-box-cys" class="form-control" type="text"
                                    placeholder="Tìm khách hàng (F4)">
                                <span class="del-cys"></span>
                                <div id="cys-suggestion-box">
                                    <div class="search-cys-inner"></div>
                                </div>
                                <div class="add-customer">
                                    <button type="button" data-toggle="modal" data-target="#create-cust"
                                        class="btn-customer"><i class="fa fa-plus" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span>Khách lẻ</span>
                        </div>
                        <div class="form-group marg-bot-10 clearfix" style="display:none">
                            <div style="padding:0px" class="col-md-4">
                                <label>Nhân viên bán hàng</label>
                            </div>
                            <div class="col-md-8" style="display:none">
                                <select class="form-control" id="sale_id">
                                    <option value="">Lựa chọn nhân viên bán hàng</option>
                                    <?php foreach ($data['sale'] as $item) { ?>
                                    <option value="<?php echo $item['id']; ?>">
                                        <?php echo $item['display_name']; ?>
                                    </option>
                                    <?php } ?>
                                </select>
                            </div>
                        </div>
                        <div class="form-group marg-bot-10 clearfix" style="display:none">
                            <div style="padding:0px" class="col-md-4">
                                <label>Ghi chú</label>
                            </div>
                            <div class="col-md-8">
                                <textarea id="note-order" cols="" class="form-control" rows="3"
                                    style="border-radius: 0;"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="content-infor">
                        <div class="infor infor-bill">
                            <span>Hóa đơn</span>
                        </div>
                        <div class="tab-contents" style="padding: 8px 6px;">
                            <div class="form-group marg-bot-10 clearfix">
                                <div class="pos-bill">
                                    <div class="form-group clearfix">
                                        <div class="text-money">Tổng tiền hàng</div>
                                        <div class="total-money">0</div>
                                    </div>
                                    <div class="form-group clearfix">
                                        <div class="text-discont">Giảm giá</div>
                                        <input type="text" class="form-control text-right txtMoney discount-order"
                                            placeholder="0">
                                    </div>
                                    <div class="form-group clearfix">
                                        <div class="text-money">Khách cần trả</div>
                                        <div class="total-after-discount">0</div>
                                    </div>
                                    <div class="form-group clearfix">
                                        <div class="text-pay">Khách thanh toán</div>
                                        <input type="text" class="form-control text-right txtMoney customer-pay"
                                            placeholder="0">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group marg-bot-10 clearfix">
                                <div class="text-debt">Tiền thừa trả khách</div>
                                <div class="debt">0</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="btn-groups pull-right">
                            <button type="button" class="btn-payment" onclick="cms_save_orders(4)"><i
                                    class="fa fa-print"></i> Thanh toán (F10)</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>    
    </section>
</body>
<script src="public/templates/js/jquery.js"></script>
<script src="public/templates/js/jquery-ui.min.js"></script>
<script src="public/templates/js/html5shiv.min.js"></script>
<script src="public/templates/js/respond.min.js"></script>
<script src="public/templates/js/bootstrap.min.js"></script>
<script src="public/templates/js/ajax.js"></script>
<script>
    $(function () {
        $("#search-pro-box").autocomplete({
            minLength: 1,
            source: 'orders/cms_autocomplete_products/',
            focus: function (event, ui) {
                $("#search-pro-box").val(ui.item.prd_code);
                return false;
            },
            select: function (event, ui) {
                cms_select_product_sell(ui.item.ID);
                $("#search-pro-box").val('');
                return false;
            }
        }).keyup(function (e) {
            if (e.which === 13) {
                cms_autocomplete_enter_sell();
                $("#search-pro-box").val('');
                $(".ui-menu-item").hide();
            }
        })
            .autocomplete("instance")._renderItem = function (ul, item) {
                return $("<li>")
                    .append("<div>" + item.prd_code + " - " + item.prd_name + "</div>")
                    .appendTo(ul);
            };
    });

    document.addEventListener('keyup', hotkey, false);
</script>

</html>