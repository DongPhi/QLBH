<table class="table mt-5">
    <thead>
        <tr class="table-primary">
            <th style="width:5%"></th>
            <th class="text-left" style="width:12%">Mã hàng</th>
            <th class="text-center" style="display:none">Nhóm hàng</th>
            <th class="text-left">Tên hàng</th>
            <th class="text-right" style="width:12%">Giá bán</th>
            <th class="text-right" style="width:12%">Giá vốn</th>
            <th class="text-right" style="width:10%">Tồn kho</th>
        </tr>
    </thead>
    <tbody>
    <?php if (isset($data['_list_product']) && count($data['_list_product'])) : foreach ($data['_list_product'] as $key => $item) : ?>
            <tr class="table-success">
                <td style="text-align: center;">
                    <i style="color: #478fca!important;"  onclick="cms_show_detail_order(<?php echo $item['ID'];?>)" class="fa fa-plus-circle i-detail-order-<?php echo $item['ID']?>"></i>
                    <i style="color: #478fca!important;" onclick="cms_show_detail_order(<?php echo $item['ID'];?>)" class="fa fa-minus-circle i-hide i-detail-order-<?php echo $item['ID']?>"></i>
                </td>
                <td class="text-left"><?php echo $item['prd_code']; ?></td>
                <td class="text-center" style="display:none"><?php echo cms_getNamegroupbyID($item['prd_group_id']); ?></td>
                <td class="text-left prd_name" ><?php echo $item['prd_name']; ?>
                </td>
                <td class="text-right"><?php echo number_format($item['prd_sell_price']); ?></td>
                
                <td class="text-right"><?php echo number_format($item['prd_origin_price']); ?></td>
                
                <td class="text-right"><?php echo $item['prd_sls']; ?></td>
                

            </tr>
            <tr class="tr-hide" id="tr-detail-order-<?php echo $item['ID']?>">
                <td colspan="15">
                    <ul class="nav nav-tabs ml-5">
                        <li class="nav-item active">
                            <a class="nav-link " data-toggle="tab" href="#menu1">Thông tin</a>
                        </li>
                    </ul>

                    <!-- Tab panes -->
                    <div class="tab-content">
                    <div class="tab-pane active" id="menu1">
                        <h3 class="text-primary font-weight-bold ml-5 mt-4"><?php echo $item['prd_name']; ?></h3>
                                <div class="row ml-5 mt-4">
                                    <div class="col-md-4">
                                        <i class="fa fa-picture-o" aria-hidden="true" style="font-size: 100px"></i>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="mt-4 border-bot"> 
                                                    <div class="row">
                                                        <div class="col-md-3">Mã hàng:</div>
                                                        <div class="col-md-9"><?php echo $item['prd_code']; ?></div>
                                                    </div>
                                                </div>
                                                <div class="mt-4 border-bot">
                                                    <div class="row">
                                                        <div class="col-md-3">Nhóm hàng:</div>
                                                        <div class="col-md-9"><?php echo cms_getNamegroupbyID($item['prd_group_id']); ?></div>
                                                    </div>
                                                </div>
                                                <div class="mt-4 border-bot">
                                                    <div class="row">
                                                        <div class="col-md-3">Giá bán:</div>
                                                        <div class="col-md-9"><?php echo number_format($item['prd_sell_price']); ?></div>
                                                    </div>
                                                </div>
                                                <div class="mt-4 border-bot">
                                                    <div class="row">
                                                        <div class="col-md-3">Giá vốn:</div>
                                                        <div class="col-md-9"><?php echo number_format($item['prd_origin_price']); ?></div>
                                                    </div>
                                                </div>
                                                <div class="mt-4 border-bot">
                                                    <div class="row">
                                                        <div class="col-md-3">Tồn kho:</div>
                                                        <div class="col-md-9"><?php echo $item['prd_sls']; ?></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="text-right mgt-15">
                                    <button 
                                        class="btn btn-success mr-3 pr-5 pl-5 pt-3 pb-3"
                                        onclick="<?php if (isset($data['option'])) 
                                        {
                                            if ($data['option'] == 1)
                                                echo 'cms_edit_product_deactivated';
                                            elseif ($data['option'] == 2)
                                                echo 'cms_edit_product_deleted';
                                            else
                                                echo 'cms_edit_product';
                                        }else
                                            echo 'cms_edit_product'; ?>
                                            (<?php echo $item['ID']; ?>)"
                                        <?php echo $item['prd_name']; ?>
                                        >Cập nhật
                                    </button>
                                    <button class="btn btn-success mr-3 pr-5 pl-5 pt-3 pb-3" onclick="cms_clone_product(<?php echo $item['ID']; ?>);">Sao chép</button>
                                    <?php
                                        if (isset($data['option'])){
                                            if ($data['option'] == 1){
                                            ?>
                                                <button class="btn btn-success mr-3 pr-5 pl-5 pt-3 pb-3" onclick="cms_restore_product_deleted(<?php echo $item['ID'].','.$data['page']; ?>);"> 
                                                    Cho phép kinh doanh
                                                </button>
                                            <?php
                                            } elseif ($data['option'] == 2) {
                                                ?>
                                                    <button class="btn btn-success mr-3 pr-5 pl-5 pt-3 pb-3" onclick="cms_restore_product_deleted(<?php echo $item['ID'].','.$data['page']; ?>);"> 
                                                        Cho phép kinh doanh
                                                    </button>
                                                <?php
                                            } else {
                                                ?>
                                                    <button class="btn btn-success mr-3 pr-5 pl-5 pt-3 pb-3" onclick="cms_deactivate_product(<?php echo $item['ID'].','.$data['page']; ?>);"> 
                                                    Ngừng kinh doanh
                                                    </button>
                                             <?php
                                            }
                                        }else{
                                            ?>
                                                <button class="btn btn-success mr-3 pr-5 pl-5 pt-3 pb-3" onclick="cms_deactivate_product(<?php echo $item['ID'].','.$data['page']; ?>);"> 
                                                    Ngừng kinh doanh
                                                </button>
                                            <?php
                                        }
                                    ?>
                                    <button class="btn btn-danger mr-3 pr-5 pl-5 pt-3 pb-3" onclick="cms_delete_product(<?php echo $item['ID'].','.$data['page']; ?>)">Xóa</button>
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
    <div class="sm-info pull-left padd-0">SL sản phẩm:
        <span><?php echo (isset($data['_sl_product'])) ? $data['_sl_product'] : 0; ?>
    </div>
    <div class="pull-right ajax-pagination">
        <?php echo $_pagination_link; ?>
    </div>
</div>
