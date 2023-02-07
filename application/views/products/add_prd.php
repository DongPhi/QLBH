<div class="bg-addprd">
    <div class="main-space customer"></div>
    <div class="add-product products-content">
        <div class="header">
            <div class="addprd-content">
                Thêm sản phẩm
            </div>
            <div class="addprd-exit">
                <a onclick="cms_javascript_redirect( cms_javascrip_fullURL() )"><i class="fa fa-times" aria-hidden="true"></i></a>
            </div>
        </div>
        <div class="addprd-main">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group clearfix row">
                        <span class="col-md-3 mt-2">Mã hàng</span>
                        <input type="text" id="prd_code" class="form-control col-md-9" placeholder="Mã hàng tự động" />
                    </div>
                    <div class="form-group clearfix row">
                        <span class="col-md-3 mt-2">Tên hàng</span>
                        <input type="text" id="prd_name"
                            value="<?php if (isset($data['_detail_product'])) echo $data['_detail_product']['prd_name'] . ' - copy' ?>"
                            class="form-control col-md-9" placeholder="" />
                    </div>
                    <div class="form-group clearfix row">
                        <span class="col-md-3 mt-2">Nhóm hàng</span>
                        <select class="form-control col-md-8" id="prd_group_id">
                            <option>--Lựa chọn--</option>
                            <optgroup label="Chọn danh mục">
                                <?php $group_id = 0;
                                        if (isset($data['_detail_product']))
                                        $group_id = $data['_detail_product']['prd_group_id'];
                                    ?>
                                <?php if (isset($data['_prd_group']) && count($data['_prd_group'])):
                                                    foreach ($data['_prd_group'] as $key => $item) :
                                    ?>
                                <option <?php if ($group_id==$item['id']) echo 'selected ' ?>
                                    value="
                                    <?php echo $item['id']; ?>">
                                    <?php echo $item['prd_group_name']; 
                                        ?>
                                </option>
                                <?php
                                        endforeach;
                                        endif;
                                    ?>
                            </optgroup>
                        </select>
                        <div class="col-md-1 padd-0 ">
                            <button type="button" class="btn btn-primary add-prdgroup" data-toggle="modal"
                                data-target="#list-prd-group">
                                <i class="fa fa-plus" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                    <div class="form-group clearfix row">
                        <span class="col-md-3 mt-2">Giá bán</span>
                        <input type="text" id="prd_sell_price"
                            value="<?php if (isset($data['_detail_product'])) echo $data['_detail_product']['prd_sell_price'] ?>"
                            class="form-control col-md-9 txtMoney text-right" placeholder="0" />
                    </div>
                    <div class="form-group clearfix row">
                        <span class="col-md-3 mt-2">Giá vốn</span>
                        <input type="text" id="prd_origin_price"
                            value="<?php if (isset($data['_detail_product'])) echo $data['_detail_product']['prd_origin_price'] ?>"
                            class="form-control col-md-9 text-right txtMoney" placeholder="0" />
                    </div>
                    <div class="form-group clearfix row">
                        <span class="col-md-3 mt-2">Số lượng</span>
                        <input type="text" id="prd_sls" value="" placeholder="0"
                            class="form-control col-md-9 text-right txtNumber" />
                    </div>
                    <div class="form-group clearfix row">
                        <span class="col-md-3 mt-2">Nhà cung cấp</span>
                        <select class="form-control col-md-8" id="prd_manufacture_id">
                            <option>--Lựa chọn--</option>
                            <optgroup>
                                <?php $manufacture_id = 0;
                                    if (isset($data['_detail_product']))
                                        $manufacture_id = $data['_detail_product']['prd_manufacture_id'];
                                        echo $manufacture_id;
                                ?>
                                <?php if (isset($data['_prd_manufacture']) && count($data['_prd_manufacture'])):
                                    foreach ($data['_prd_manufacture'] as $key => $val) :
                                ?>
                                <option <?php if ($manufacture_id==$val['ID']) echo 'selected ' ?>
                                    value="
                                    <?php echo $val['ID']; ?>">
                                    <?php echo $val['prd_manuf_name']; ?>
                                </option>
                                <?php
                                    endforeach;
                                    endif;
                                ?>
                            </optgroup>
                        </select>
                        <div class="col-md-1 padd-0">
                            <button type="button" class="btn btn-primary add-prdgroup" data-toggle="modal"
                                data-target="#list-prd-manufacture">
                                <i class="fa fa-plus" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <button class="btn" onclick="browseKCFinder('img_upload','image');return false;">
                            <i class="fa fa-picture-o" style="font-size: 80px;color: #fff; "></i>
                        </button>
                        <button class="btn" onclick="browseKCFinder('img_upload','image');return false;">
                            <i class="fa fa-picture-o" style="font-size: 80px;color: #fff; "></i>
                        </button>
                        <button class="btn" onclick="browseKCFinder('img_upload','image');return false;">
                            <i class="fa fa-picture-o" style="font-size: 80px;color: #fff; "></i>
                        </button>
                        <button class="btn" onclick="browseKCFinder('img_upload','image');return false;">
                            <i class="fa fa-picture-o" style="font-size: 80px;color: #fff; "></i>
                        </button>
                        <button class="btn" onclick="browseKCFinder('img_upload','image');return false;">
                            <i class="fa fa-picture-o" style="font-size: 80px;color: #fff; "></i>
                        </button>
                    </div>
                    <div class="form-group">
                        <label class="checkbox" style="display: block;">
                            <input type="checkbox" id="prd_inventory" class="checkbox" name="confirm" value="1" <?php if
                                (isset($data['_detail_product']) and $data['_detail_product']['prd_inventory']==1)
                                echo 'checked="checked"' ?>>
                            <span></span> Theo dõi tồn kho?
                        </label>
                        <label class="checkbox">
                            <input type="checkbox" id="prd_allownegative" class="checkbox" name="confirm" value="1"
                                <?php if (isset($data['_detail_product']) and
                                $data['_detail_product']['prd_allownegative']==1) echo 'checked="checked"' ?>>
                            <span></span> Cho phép bán âm?
                        </label>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="expand-info" style="display:none">
            <div class="row">
                <div class="col-md-12">
                    <h4 style="border-bottom: 1px solid #0B87C9; padding-bottom: 10px;"><i
                            class="fa fa-th-large blue"></i> <a style="color: #0B87C9; text-decoration: none;"
                            data-toggle="collapse" href="#collapseproductinfo" aria-expanded="false"
                            aria-controls="collapseExample">Thông tin mở rộng(
                            <small> Nhấn để thêm các thông tin cho thuộc tính web</small>
                            )</a></h4>
                </div>
                <div class="col-md-12">
                    <div style="margin-top: 5px;"></div>
                    <div class="collapse" id="collapseproductinfo">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-12 padd-20">
                                    <div class="jumbotron text-center" id="img_upload"
                                        style="border-radius: 0; margin-bottom: 10px; padding: 15px 20px;">
                                        <h3>Upload hình ảnh sản phẩm</h3>
                                        <small style="font-size: 14px; margin-bottom: 5px; display: inline-block;">(Để
                                            tải và hiện thị nhanh, mỗi ảnh lên có dung lượng 500KB. Tải tối đa 10MB.)
                                        </small>
                                        <p>
                                            <button class="btn" style="background-color: #337ab7; "
                                                onclick="browseKCFinder('img_upload','image');return false;"><i
                                                    class="fa fa-picture-o" style="font-size: 40px;color: #fff; "></i>
                                            </button>
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="col-md-12 padd-20">
                            <h4 style="margin-top: 0;">Mô tả
                                <small style="font-style: italic;">(Nhập thông tin mô tả chi tiết hơn để khách hàng hiểu
                                    hàng hoá của bạn)
                                </small>
                            </h4>
                            <div id="ckeditor"></div>
                        </div>
                        <div class="col-md-3 padd-20">
                            <h4>Thông tin cho web</h4>
                            <small ">Hiện thị trên trang web, tối ưu SEO.</small>
                            </div>
                            <div class=" col-md-9">
                                <div class="row">
                                    <div class="checkbox-group" style="margin-top: 20px;">
                                        <label class="checkbox"><input type="checkbox" class="checkbox"
                                                id="display_website"><span></span> Hiện thị ra
                                            website</label>
                                        <br>
                                        <label class="checkbox"><input type="checkbox" id="prd_highlight"
                                                class="checkbox"><span></span> Nổi bật</label>&nbsp;&nbsp;<label
                                            class="checkbox"><input type="checkbox" class="checkbox"
                                                id="prd_new"><span></span> Hàng mới</label>&nbsp;&nbsp;&nbsp;<label
                                            class="checkbox"><input type="checkbox" class="checkbox"
                                                id="prd_hot"><span></span> Đang bán chạy</label>
                                    </div>
                                </div>
                                <div class="btn-groups pull-right" style="margin-top: 15px;">
                                    <button type="button" class="btn btn-primary"
                                        onclick="cms_add_product( 'save' );"><i class="fa fa-check"></i> Lưu
                                    </button>
                                    <button type="button" class="btn btn-primary "
                                        onclick="cms_add_product( 'saveandcontinue' );"><i class="fa fa-floppy-o"></i>
                                        Lưu và tiếp tục
                                    </button>
                                    <button type="button" class="btn btn-default btn-back"
                                        onclick="cms_javascript_redirect( cms_javascrip_fullURL() )"><i
                                            class="fa fa-arrow-left"></i> Trở về
                                    </button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">

            </div>
            <div class="col-md-6">
                <div class="btn-groups text-right mr-5">
                                <button type="button" class="btn btn-primary" onclick="cms_add_product( 'save' );"><i
                                        class="fa fa-check"></i> Lưu
                                </button>
                                <button type="button" class="btn btn-primary "
                                    onclick="cms_add_product( 'saveandcontinue' );"><i class="fa fa-floppy-o"></i> Lưu và
                                    tiếp tục
                                </button>
                                <button type="button" class="btn btn-primary"
                                    onclick="cms_javascript_redirect( cms_javascrip_fullURL() )"><i
                                        class="fa fa-arrow-left"></i> Quay lại
                                </button>
                            </div>
            </div>
        </div>
        <div class="breadcrumbs-fixed panel-action">
            <div class="row">
                <div class="products-act">
                    <div class="col-md-4 col-md-offset-2">
                    </div>
                    <div class="col-md-6">
                        <div class="right-action text-right">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    initSample();
</script>