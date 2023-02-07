<table class="table">
    <thead>
        <tr class="table-primary">
            <th style="width:5%"></th>
            <th class="text-left" style="width:12%">Mã hóa đơn</th>
            <th class="text-left">Thời gian</th>
            <th class="text-left">Khách hàng</th>
            <th class="text-right" style="width:12%">Tiền hàng</th>
            <th class="text-right" style="width:12%">Giảm giá</th>
            <th class="text-right" style="width:10%">Tổng tiền</th>
        </tr>
    </thead>
    <tbody>
    <?php if (isset($_list_orders) && count($_list_orders)) : foreach ($_list_orders as $key => $item) : $list_products = json_decode($item['detail_order'], true); ?>
            <tr class="table-success">
                <td style="text-align: center;">
                    <i 
                        style="color: #478fca!important;" 
                        onclick="cms_show_detail_order(<?php echo $item['ID'];?>)"
                        class="fa fa-plus-circle i-detail-order-<?php echo $item['ID']?>">
                    </i>
                    <i 
                        style="color: #478fca!important;" 
                        onclick="cms_show_detail_order(<?php echo $item['ID'];?>)"
                        class="fa fa-minus-circle i-hide i-detail-order-<?php echo $item['ID']?>">
                    </i>
                </td>
                <td class="text-left"><?php echo $item['output_code']; ?></td>
                <td class="text-left"><?php echo ($item['sell_date'] != '0000-00-00 00:00:00') ? gmdate("d/m/Y H:i", strtotime(str_replace('-', '/', $item['sell_date'])) + 7 * 3600) : '-'; ?></td>
                <td class="text-left"><?php echo cms_getNamecustomerbyID($item['customer_id']); ?></td>
                <td class="text-right"><?php echo cms_encode_currency_format($item['total_price']); ?></td>
                <td class="text-right"><?php echo cms_encode_currency_format($item['coupon']); ?></td>
                <td class="text-right"><?php echo cms_encode_currency_format($item['total_money']); ?></td>
            </tr>
                <tr class="tr-hide" id="tr-detail-order-<?php echo $item['ID']?>" style="background-color: #fff">
                    <td colspan="15">
                        <div class="tabbable">
                            <ul class="nav nav-tabs">
                                <li class="nav-item active">
                                    <a class="nav-link " data-toggle="tab" href="#menu1">Thông tin</a>
                                </li>
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane active" id="menu1">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="mt-4 border-bot">
                                                <div class="row">
                                                    <div class="col-md-3">Mã hóa đơn:</div>
                                                    <div class="col-md-9"><?php echo $item['output_code']; ?></div>
                                                </div>
                                            </div>
                                            <div class="mt-4 border-bot">
                                                <div class="row">
                                                    <div class="col-md-3">Thời gian:</div>
                                                    <div class="col-md-9"><?php echo ($item['sell_date'] != '0000-00-00 00:00:00') ? gmdate("d/m/Y H:i", strtotime(str_replace('-', '/', $item['sell_date'])) + 7 * 3600) : '-'; ?></div>
                                                </div>
                                            </div>
                                            <div class="mt-4 border-bot">
                                                <div class="row">
                                                    <div class="col-md-3">Khách hàng:</div>
                                                    <div class="col-md-9"><?php echo cms_getNamecustomerbyID($item['customer_id']); ?></div>
                                                </div>
                                            </div>     
                                        </div>
                                        <div class="col-md-4">
                                            <div class="mt-4 border-bot">
                                                <div class="row">
                                                    <div class="col-md-3">Trạng thái:</div>
                                                    <div class="col-md-9"><?php echo cms_getNamestatusbyID($item['order_status']); ?></div>
                                                </div>
                                            </div>
                                            <div class="mt-4 border-bot">
                                                <div class="row">
                                                    <div class="col-md-3">Chi nhánh:</div>
                                                    <div class="col-md-9"><?php echo cms_getNamestockbyID($item['store_id']); ?></div>
                                                </div>
                                            </div>
                                            <div class="mt-4 border-bot">
                                                <div class="row">
                                                    <div class="col-md-3">Người tạo:</div>
                                                    <div class="col-md-9"><?php echo cms_getNameAuthbyID($item['user_init']); ?></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <table class="table table-striped table-bordered table-hover dataTable mt-5">
                                        <thead>
                                            <tr class="table-primary">
                                                <th class="text-left">Mã sản phẩm</th>
                                                <th class="text-left">Tên sản phẩm</th>
                                                <th class="text-center">Số lượng</th>
                                                <th class="text-center">Giá bán</th>
                                                <th class="text-center">Giảm giá</th>
                                                <th class="text-center ">Thành tiền</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php
                                            $queue= 1;
                                            foreach ($list_products as $product) {
                                                $_product = cms_finding_productbyID($product['id']);
                                                $_product['quantity'] = $product['quantity'];
                                                $_product['price'] = $product['price'];
                                                ?>
                                                <tr>
                                                    <td class="text-left">
                                                        <?php echo $_product['prd_code']; ?>
                                                    </td>
                                                    <td class="text-left ">
                                                        <?php echo $_product['prd_name']; ?>
                                                    </td>
                                                    <td class="text-center ">
                                                        <?php echo $_product['quantity']; ?>
                                                    </td>
                                                    <td class="text-center">
                                                        <?php echo cms_encode_currency_format($_product['price']); ?>
                                                    </td>
                                                    <td class="text-center">
                                                        0
                                                    </td>
                                                    <td class="text-center">
                                                        <?php echo cms_encode_currency_format($_product['price']*$_product['quantity']); ?>
                                                    </td>
                                                </tr>
                                            <?php
                                            }
                                            ?>
                                        </tbody>
                                    </table>
                                    <div class="mgt-15">
                                        <div class="row">
                                            <div class="col-8">
                                                
                                            </div>
                                            <div class="col-4">
                                                <div class="row">
                                                    <div class="col-6 text-right">
                                                        Tổng số lượng hàng:
                                                    </div>
                                                    <div class="col-6 text-right">
                                                        <?php echo $item['total_quantity']; ?>
                                                    </div>
                                                </div>
                                                <div class="row mt-3">
                                                    <div class="col-6 text-right">
                                                        Tổng tiền hàng:
                                                    </div>
                                                    <div class="col-6 text-right">
                                                        <?php echo cms_encode_currency_format($item['total_price']); ?>
                                                    </div>
                                                </div>
                                                <div class="row mt-3">
                                                    <div class="col-6 text-right">
                                                        Giảm giá hóa đơn:
                                                    </div>
                                                    <div class="col-6 text-right">
                                                        <?php echo cms_encode_currency_format($item['coupon']); ?>
                                                    </div>
                                                </div>
                                                <div class="row mt-3">
                                                    <div class="col-6 text-right">
                                                       Tổng cộng:
                                                    </div>
                                                    <div class="col-6 text-right">
                                                        <?php echo cms_encode_currency_format($item['total_money']); ?>
                                                    </div>
                                                </div>
                                                <div class="row mt-3">
                                                    <div class="col-6 text-right">
                                                       Dư nợ:
                                                    </div>
                                                    <div class="col-6 text-right">
                                                        <?php echo cms_encode_currency_format($item['lack']); ?>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-right mgt-15">
                                        <button class="btn btn-success mr-3 pr-5 pl-5 pt-3 pb-3" onclick="cms_print_order(1,<?php echo $item['ID']; ?>)">In</button>
                                        <button class="btn btn-danger mr-3 pr-5 pl-5 pt-3 pb-3" title="<?php if ($option == 1) echo 'Xóa vĩnh viễn'; else echo 'Xóa'?>" onclick="<?php if ($option == 1) echo 'cms_del_order'; else echo 'cms_del_temp_order'?>(<?php echo $item['ID'] . ',' . $page; ?>)">
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
        <?php endforeach;
        else :
            echo '<tr><td colspan="9" class="text-center">Không có dữ liệu</td></tr>';
        endif;
        ?>
    </tbody>
</table>
<div class="alert alert-info summany-info clearfix" role="alert">
    <div class="sm-info pull-left padd-0">
        SL hóa đơn:
        <span><?php echo (isset($total_orders['quantity'])) ? $total_orders['quantity'] : 0; ?></span>
        <span> - </span>
        Tổng tiền:
        <span><?php echo cms_encode_currency_format((isset($total_orders['total_money']) ? $total_orders['total_money'] : 0)); ?> đồng</span>
        <span> - </span>
        Tổng nợ:
        <span><?php echo cms_encode_currency_format((isset($total_orders['total_debt']) ? $total_orders['total_debt'] : 0)); ?> đồng</span>
    </div>
    <div class="pull-right ajax-pagination">
        <?php echo $_pagination_link; ?>
    </div>
</div>