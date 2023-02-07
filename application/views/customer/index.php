<div class="products" style="margin-top:20px">
    <div class="row">
        <div class="col-2">
            <div class="form-group prd-search">
                <h4 class="txt-search p-3">Tìm kiếm</h4>
                <div class="p-3">
                    <input type="text" class="form-control txt-scustomer" placeholder="Theo mã, tên, sđt khách hàng">
                    <select id="cus-option" class="form-control mt-3">
                        <option value="0">Tất cả</option>
                        <option value="1">KH từng mua hàng</option>
                        <option value="2">KH còn nợ</option>
                    </select>
                    <button type="button" onclick="cms_paging_listcustomer(1)" class="btn btn-primary btn-large btn-sCustomer mt-3" >
                        <i class="fa fa-search"></i> Tìm kiếm
                    </button>
                </div>
            </div>
        </div>
        <div class="col-10">
            <div class="product-main-header">
                <div class="txt-prod-left">
                    <h3 class="mt-3">Khách hàng</h3>
                </div>
                <div class="txt-prod-right">
                    <div class="btn-groups">
                        <button type="button" class="btn btn-success mr-3" data-toggle="modal" data-target="#create-cust"><i class="fa fa-plus"></i> Khách hàng</button>
                        <button type="button" class="btn btn-success"><i class="fa fa-download"></i> Xuất Excel</button>
                    </div>
                </div>
            </div>
            <div class="customer-main-body">
                <table class="table mt-5">
                    <thead>
                        <tr class="table-primary">
                            <th style="width:5%"></th>
                            <th class="text-left" style="width:12%">Mã khách hàng</th>
                            <th class="text-left">Tên khách hàng</th>
                            <th class="text-left">Điện thoại</th>
                            <th class="text-right" style="width:20%">Tổng bán</th>
                            <th class="text-right" style="width:20%">Tổng nợ</th>
                        </tr> 
                    </thead>
                    <tbody>
                        <?php if (isset($_list_customer) && count($_list_customer)) : foreach ($_list_customer as $key => $item) : ?>
                            <tr class="table-success" id="tr-item-<?php echo $item['ID']; ?>">
                                <td style="text-align: center;">
                                    <i style="color: #478fca!important;"  onclick="cms_show_detail_order(<?php echo $item['ID'];?>)" class="fa fa-plus-circle i-detail-order-<?php echo $item['ID']?>"></i>
                                    <i style="color: #478fca!important;" onclick="cms_show_detail_order(<?php echo $item['ID'];?>)" class="fa fa-minus-circle i-hide i-detail-order-<?php echo $item['ID']?>"></i>
                                </td>
                                <td onclick="cms_detail_customer(<?php echo $item['ID']; ?>)">
                                    <?php echo $item['customer_code']; ?>
                                </td>
                                <td onclick="cms_detail_customer(<?php echo $item['ID']; ?>)">
                                    <?php echo $item['customer_name']; ?></td>
                                <td>
                                    <?php echo (!empty($item['customer_phone'])) ? $item['customer_phone'] : '-'; ?>
                                </td>
                                <td class="text-right">
                                    <?php echo (!empty($item['total_money'])) ? number_format($item['total_money']) : '0'; ?>
                                </td>
                                <td class="text-right">
                                    <?php echo (!empty($item['total_debt'])) ? number_format($item['total_debt']) : '0'; ?>
                                </td>
                            </tr>
                            <tr class="tr-hide" id="tr-detail-order-<?php echo $item['ID']?>" style="background-color: #fff">
                                <td colspan="15">
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
                                                            <div class="col-md-4">Mã khách hàng:</div>
                                                            <div class="col-md-8"><?php echo $item['customer_code']; ?></div>
                                                        </div>
                                                    </div>
                                                    <div class="mt-4 border-bot">
                                                        <div class="row">
                                                            <div class="col-md-4">Tên khách hàng:</div>
                                                            <div class="col-md-8"> <?php echo $item['customer_name']; ?></div>
                                                        </div>
                                                    </div>
                                                    <div class="mt-4 border-bot">
                                                        <div class="row">
                                                            <div class="col-md-4">Ngày sinh:</div>
                                                            <div class="col-md-8"><?php echo (!empty($item['sell_date'])) ? $item['sell_date'] : '-'; ?></div>
                                                        </div>
                                                    </div>     
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="mt-4 border-bot">
                                                        <div class="row">
                                                            <div class="col-md-4">Điện thoại:</div>
                                                            <div class="col-md-8"><?php echo (!empty($item['customer_phone'])) ? $item['customer_phone'] : '-'; ?></div>
                                                        </div>
                                                    </div>
                                                    <div class="mt-4 border-bot">
                                                        <div class="row">
                                                            <div class="col-md-4">Địa chỉ:</div>
                                                            <div class="col-md-8"> <?php echo (!empty($item['customer_addr'])) ? $item['customer_addr'] : '-'; ?></div>
                                                        </div>
                                                    </div>
                                                    <div class="mt-4 border-bot">
                                                        <div class="row">
                                                            <div class="col-md-4">Email:</div>
                                                            <div class="col-md-8"><?php echo (!empty($item['customer_email'])) ? $item['customer_email'] : '-'; ?></div>
                                                        </div>
                                                    </div>     
                                                </div>
                                            </div>
                                        </div>
                                        <div class="text-right mgt-15">
                                            <button class="btn btn-success mr-3 pr-5 pl-5 pt-3 pb-3" onclick="cms_edit_cusitem('customer')">Cập nhật</button>
                                            <button class="btn btn-danger mr-3 pr-5 pl-5 pt-3 pb-3" onclick="cms_delCustomer(<?php echo $item['ID']; ?>,1);">
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        <?php endforeach; 
                        else: ?>
                        <tr>
                            <td colspan="8" class="text-center">Không có dữ liệu</td>
                        </tr>
                        <?php endif; ?>
                    </tbody>
                </table>
                
                <div class="alert alert-info summany-info clearfix" role="alert">
                    <div class="ajax-loadlist-total sm-info pull-left padd-0">Số khách hàng:
                        <span><b><?php echo (isset($_total_customer) && !empty($_total_customer)) ? $_total_customer : '0'; ?></b></span>
                             | Tổng tiền hàng: <span><b><?php echo (isset($_total_money) && !empty($_total_money)) ? cms_encode_currency_format($_total_money) : '0'; ?></b> đ</span> | Tổng nợ: <span><b><?php echo (isset($_total_debt) && !empty($_total_debt)) ? cms_encode_currency_format($_total_debt) : '0'; ?></b> đ</span></div>
                    <div class="pull-right">
                        <?php echo $_pagination_link; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
