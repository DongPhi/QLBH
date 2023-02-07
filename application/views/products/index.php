<div class="products" style="margin-top:20px">
    <div class="row">
        <div class="col-2">
            <div class="form-group prd-search">
                <h4 class="txt-search p-3">Tìm kiếm</h4>
                <div class="p-3">
                    <input type="text" class="form-control" placeholder="Theo mã, tên hàng" id="product-search">
                    <select class="form-control search-option-2 mt-3" id="prd_group_id">
                        <option value="-1" selected="selected">Danh mục</option>
                    </select>
                    <select class="form-control mt-3" id="search-option-1">
                        <option value="0">Đang kinh doanh</option>
                        <option value="1">Đã ngừng kinh doanh</option>
                        <option value="2">Đã xóa</option>
                    </select>
                    <button type="button" class="btn btn-primary btn-large btn-ssup mt-3"  onclick="cms_paging_product(1)">
                        <i class="fa fa-search"></i> Tìm kiếm
                    </button>
                </div>  
            </div>
        </div>
        <div class="col-10">
            <div class="product-main-header">
                <div class="txt-prod-left">
                    <h3 class="mt-3">Hàng hóa</h3>
                </div>
                <div class="txt-prod-right">
                    <div class="btn-groups">
                        <button type="button" class="btn btn-success mr-3" onclick="cms_vcrproduct('1')"><i class="fa fa-plus"></i> Hàng hóa</button>
                        <button type="button" class="btn btn-success"><i class="fa fa-download"></i> Xuất Excel</button>
                    </div>
                </div>
            </div> 
            <div class="product-main-body">
            </div>
        </div>
    </div>
    <div class="products-content" style="margin-top:20px; display:none">
        <div class="product-sear panel-sear">
            <div action="" class="">
                <!-- <div class="form-group col-md-5 padd-0">
                    <input type="text" class="form-control" placeholder="Nhập mã sản phẩm hoặc tên sản phẩm"
                           id="product-search">
                </div> -->
                <div class="form-group col-md-7 ">
                    <div class="col-md-3 padd-0" style="margin-right: 10px;">
                        <select class="form-control" id="search-option-1">
                            <option value="0">Đang kinh doanh</option>
                            <option value="1">Đã ngừng kinh doanh</option>
                            <option value="2">Đã xóa</option>
                        </select>
                    </div>
                    <!-- <div class="col-md-3 padd-0" style="margin-right: 10px;">
                        <select class="form-control search-option-2" id="prd_group_id">
                            <option value="-1" selected="selected">Danh mục</option>
                        </select>
                    </div> -->
                    <div class="col-md-3 padd-0" style="margin-right: 10px;">
                        <select class="form-control search-option-3" id="prd_manufacture_id">
                            <option value="-1" selected="selected">Nhà sản xuất</option>
                            <optgroup label="Chọn nhà sản xuất">
                                <?php if (isset($data['_prd_manufacture']) && count($data['_prd_manufacture'])):
                                    foreach ($data['_prd_manufacture'] as $key => $val) :
                                        ?>
                                        <option
                                            value="<?php echo $val['ID']; ?>"><?php echo $val['prd_manuf_name']; ?></option>
                                    <?php
                                    endforeach;
                                endif;
                                ?>
                            </optgroup>
                            <optgroup label="------------------------">
                                <option value="product_manufacture" data-toggle="modal" data-target="#list-prd-manufacture">Tạo mới Nhà sản xuất
                                </option>
                            </optgroup>
                        </select>
                    </div>
                    <button type="button" class="btn btn-primary btn-large btn-ssup"  onclick="cms_paging_product(1)"><i
                            class="fa fa-search"></i> Tìm kiếm
                    </button>
                </div>
            </div>
        </div>
        
    </div>
</div>