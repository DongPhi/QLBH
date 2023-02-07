<div id="topbar">
    <div class="container-fluid">
        <div class="d-flex">
            <div class="mr-auto">
                <a href="dashboard"><img src="public/templates/images/logo.png" alt=""></a>
            </div>
            <div class="">
                <div class="pos-menubar ">
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul id="store-list" class="nav navbar-nav">
                            <?php if(isset($data['store'])){ ?>
                                <li>
                                    <select id="store-id" class="form-control">
                                        <?php foreach ($data['store'] as $key => $item) :?>
                                            <option <?php if($item['ID']==$data['store_id']) echo 'selected '; ?> value="<?php echo $item['ID']; ?>"><?php echo $item['stock_name']; ?></option>
                                        <?php endforeach;?>
                                    </select>
                                </li>
                            <?php } ?>
                        </ul>
                        <div class="nav navbar-nav">
                            <div id="menu-bar" class="dropdown">
                                <a class="btn-menu dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><?php echo (isset($user)) ? $user['display_name'] : $user['username']; ?></a>
                                <ul class="dropdown-menu dropdown-menu-right">
                                    <li><a href="account"><i class="fa fa-user" aria-hidden="true"></i> Tài khoản</a></li>
                                    <li><a href="authentication/logout"><i class="fa fa-sign-out" aria-hidden="true"></i> Đăng xuất</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                </div>
        </div>
    </div>
</div>
