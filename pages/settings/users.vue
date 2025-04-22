<template>
    <div class="row page-titles mx-0">
        <div class="col-sm-6 p-md-0">
            <div class="welcome-text">
                <h5>
                    <i class="bi bi-person"></i>
                    {{ $t("settings") }}
                    <i class="fa fa-angle-double-right"></i>
                    {{ $t("users") }}
                </h5>
            </div>
        </div>
        <div class="col-sm-6 justify-content-sm-end d-flex">
            <NuxtLink to="/"><i class="fa fa-home"></i> Dashboard</NuxtLink>
        </div>
    </div>
    <div class="col-lg-12 mt-4">
        <div class="card">
            <div class="card-header card-light">
                <div class="row w-100">
                    <div class="col-md-1">
                        <select class="form-control">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="500">500</option>
                            <option value="1000">1,000</option>
                        </select>
                    </div>

                    <div class="col-md-2">
                        <button class="btn btn-primary btn" @click="openModal">
                            {{ $t("add") }}
                        </button>
                    </div>
                    <div class="col-md-6"></div>
                    <div class="col-md-3">
                        <input type="text" class="form-control" :placeholder="$t('search') + '...'"
                            @input="searchData" />
                    </div>
                </div>
            </div>

            <div class="card-body">
                <div v-if="isLoading" class="text-center">
                    <div class="spinner-border" User="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-responsive-sm">
                        <thead>
                            <tr class="text-center">
                                <th scope="col">{{ $t("no") }}</th>
                                <th scope="col">{{ $t("firstname") }}</th>
                                <th scope="col">{{ $t("lastname") }}</th>
                                <th scope="col">{{ $t("phone") }}</th>
                                <th scope="col">{{ $t("email") }}</th>
                                <th scope="col">{{ $t("role") }}</th>
                                <th scope="col">{{ $t("village") }}</th>
                                <th scope="col">{{ $t("district") }}</th>
                                <th scope="col">{{ $t("province") }}</th>
                                <th scope="col">{{ $t("status") }}</th>
                                <th scope="col">{{ $t("action") }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center" v-for="(item, i) in dataList" :key="item.id">
                                <td>{{ i + 1 }}</td>
                                <td>{{ item.firstname }}</td>
                                <td>{{ item.lastname }}</td>
                                <td>{{ item.phone }}</td>
                                <td>{{ item.email }}</td>
                                <td>{{ item.role.name }}</td>
                                <td>{{ item.village?.name_la ?? "" }}</td>
                                <td>{{ item.district?.name_la ?? "" }}</td>
                                <td>{{ item.province?.name_la ?? "" }}</td>
                                <td>
                                    <div class="form-check form-switch" v-if="item.del == 1">
                                        <input class="form-check-input" type="checkbox"
                                            id="flexSwitchCheckChecked{{ item.id }}" checked />
                                        ໃຊ້ງານ
                                    </div>
                                    <div class="form-check form-switch" v-else-if="item.del == 0">
                                        <input class="form-check-input" type="checkbox"
                                            id="flexSwitchCheckChecked{{ item.id }}" />ບໍ່ໃຊ້ງານ
                                    </div>
                                </td>
                                <td>
                                    <button class="btn btn-success btn-sm" @click="showEdit(item)">
                                        <i class="fas fa-pencil-alt"></i>
                                    </button>
                                    <button class="btn btn-danger ml-2 btn-sm" @click="openModaldelete(item.id)">
                                        <i class="far fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup></script>


