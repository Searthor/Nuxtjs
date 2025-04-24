<template>
    <div class="min-vh-100 bg-light py-4">
        <div class="container-fluid">
            <!-- Header and Dashboard Link -->
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h5 class="h4 mb-0">{{ $t('settings') }}{{ $t('roles') }}</h5>
                <router-link to="/" class="btn btn-link text-primary text-decoration-none">
                    <i class="bi bi-house-door me-1"></i> Dashboard
                </router-link>
            </div>

            <!-- Table Section -->
            <div class="card shadow-sm">
                <div class="card-body">
                    <!-- Search and Create Button -->
                    <div class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mb-4">
                        <div class="input-group w-100" style="max-width: 300px">
                            <span class="input-group-text bg-transparent">
                                <i class="bi bi-search"></i>
                            </span>
                            <input type="text" v-model="searchQuery" class="form-control"
                                placeholder="Search roles..." />
                        </div>
                        <button @click="openModal" class="btn btn-primary w-md-auto">
                            <i class="bi bi-plus-circle me-1"></i> Create New Role
                        </button>
                    </div>
                    <!-- Roles Table -->
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col" class="text-center">#</th>
                                    <th scope="col">{{ $t('name_role') }}</th>
                                    <th scope="col">{{ $t('des') }}</th>
                                    <th scope="col" class="text-center">{{ $t('actions') }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(role, index) in filteredRoles" :key="role.id">
                                    <th scope="row" class="text-center">{{ index + 1 }}</th>
                                    <td class="fw-semibold">{{ role.name }}</td>
                                    <td>{{ role.des }}</td>
                                    <td class="text-center">
                                        <button @click="showEdit(role.id)" class="btn btn-sm btn-warning me-2">
                                            <i class="bi bi-pencil-square me-1"></i> {{ $t('update') }}
                                        </button>
                                        <button @click="confirmDelete(role.id)" class="btn btn-sm btn-danger">
                                            <i class="bi bi-trash me-1"></i> {{ $t('delete') }}
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Create/Edit Role Modal -->
        <div v-if="isModalOpen" class="modal  show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5)">
            <div class="modal-dialog modal-lg ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            {{ form.id ? $t('create') : $t('create') }} {{ $t('roles') }}
                        </h5>
                        <button @click="closeModal" type="button" class="btn-close"></button>
                    </div>

                    <form @submit.prevent="submitForm">
                        <div class="modal-body">
                            <div class="row g-3 mb-4">
                                <div class="col-md-6">
                                    <label for="name" class="form-label">{{ $t('name_role') }}</label>
                                    <input type="text" id="name" v-model="form.name" class="form-control"
                                        placeholder="Enter role name" required />
                                </div>
                                <div class="col-md-6">
                                    <label for="des" class="form-label">{{ $t('des') }}</label>
                                    <input type="text" id="des" v-model="form.des" class="form-control"
                                        placeholder="Enter description" />
                                </div>
                            </div>

                            <div class="border-top pt-3">
                                <h5 class="mb-3">{{ $t('permissions') }}</h5>

                                <div v-for="parent in function_models" :key="parent.id" class="mb-3">
                                    <div class="form-check">
                                        <input type="checkbox" :checked="selectedParents.includes(parent.id)"
                                            @change="selectParent(parent.id)" class="form-check-input"
                                            :id="'parent-' + parent.id" />
                                        <label :for="'parent-' + parent.id" class="form-check-label fw-semibold">
                                            {{ parent.des }}
                                        </label>
                                    </div>

                                    <div v-if="selectedParents.includes(parent.id)" class="ms-4 mt-2">
                                        <div v-for="child in parent.children" :key="child.id" class="mb-2">
                                            <div class="form-check">
                                                <input type="checkbox" :checked="selectedItems.includes(child.id)"
                                                    @change="onChildClick(child.id)" class="form-check-input"
                                                    :id="'child-' + child.id" />
                                                <label :for="'child-' + child.id" class="form-check-label">
                                                    {{ child.des }}
                                                </label>
                                            </div>

                                            <div v-if="selectedItems.includes(child.id) && child.children"
                                                class="ms-4 mt-2 row row-cols-1 row-cols-sm-2 row-cols-md-3 g-2">
                                                <div v-for="grandchild in child.children" :key="grandchild.id"
                                                    class="col">
                                                    <div class="form-check">
                                                        <input type="checkbox"
                                                            :checked="selectedItems.includes(grandchild.id)"
                                                            @change="toggleGrandchild(grandchild.id)"
                                                            class="form-check-input"
                                                            :id="'grandchild-' + grandchild.id" />
                                                        <label :for="'grandchild-' + grandchild.id"
                                                            class="form-check-label small">
                                                            {{ grandchild.des }}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" @click="closeModal" class="btn btn-outline-secondary">
                                {{ $t('cancel') }}
                            </button>
                            <button type="submit" class="btn btn-primary">
                                {{ form.id ? $t('update') : $t('create') }}
                                {{ $t('roles') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div v-if="showDeleteModal" class="modal fade show d-block" tabindex="-1"
            style="background-color: rgba(0,0,0,0.5)">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"><i class="bi bi-trash me-1"></i>{{ $t('delete') }} {{ $t('roles') }}
                        </h5>
                        <button @click="showDeleteModal = false" type="button" class="btn-close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure you want to delete this role? This action cannot be undone.</p>
                    </div>
                    <div class="modal-footer">
                        <button @click="showDeleteModal = false" class="btn btn-outline-secondary">
                            {{ $t('cancel') }}
                        </button>
                        <button @click="deleteRole" class="btn btn-danger">
                            {{ $t('delete') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
const { $swal } = useNuxtApp()
const isModalOpen = ref(false)
const showDeleteModal = ref(false)
const searchQuery = ref('')
const selectedParents = ref([])
const selectedItems = ref([])
const function_models = ref([])
const roleToDelete = ref(null)
const errors = ref({})
const form = ref({
    id: '',
    name: '',
    des: ''
})
const toast = ref(null)
const { data: roles, refresh } = await useFetch('/api/roles');
const getfunction_models = async () => {
    const response = await axios.get("/api/roles/function_models");
    function_models.value = response.data.function;
}


const filteredRoles = computed(() => {
    if (!searchQuery.value) return roles.value;
    const query = searchQuery.value.toLowerCase();
    return roles.value.filter((item) =>
        item.name.toLowerCase().includes(query)
    );
});


function openModal() {

    isModalOpen.value = true


}
function closeModal() {
    isModalOpen.value = false
    resetForm()
}
const showEdit = async (id) => {
    const response = await axios.get(`/api/roles/${id}`);
    form.value.id = response.data.data.id
    form.value.name = response.data.data.name
    form.value.des = response.data.data.des
    selectedParents.value = response.data.data.Parents_id
    selectedItems.value = response.data.data.function_id
    isModalOpen.value = true
}
function resetForm() {
    form.value = {
        id: '',
        name: '',
        des: ''
    }
    selectedParents.value = []
    selectedItems.value = []
}

function selectParent(id) {
    if (selectedParents.value.includes(id)) {
        // Deselect parent
        selectedParents.value = selectedParents.value.filter(parentId => parentId !== id)

        // Deselect all children and grandchildren of this parent
        const parent = function_models.value.find(p => p.id === id)
        if (parent) {
            selectedItems.value = selectedItems.value.filter(itemId => {
                return !parent.children.some(child =>
                    child.id === itemId ||
                    (child.children && child.children.some(grandchild => grandchild.id === itemId))
                )
            })
        }
        selectedItems.value = selectedItems.value.filter(itemId => itemId !== id)
    } else {
        // Select parent
        selectedParents.value = [...selectedParents.value, id]
        selectedItems.value = [...selectedItems.value, id]
    }
}

function onChildClick(childId) {
    const child = function_models.value
        .flatMap(parent => parent.children)
        .find(c => c.id === childId)
    if (!child) return
    const grandchildIds = child.children ? child.children.map(g => g.id) : []
    if (selectedItems.value.includes(childId)) {
        // Deselect child and all grandchildren
        selectedItems.value = selectedItems.value.filter(itemId =>
            itemId !== childId && !grandchildIds.includes(itemId)
        )
    } else {
        selectedItems.value = [...selectedItems.value, childId]
    }
}



function toggleGrandchild(id) {
    if (selectedItems.value.includes(id)) {
        selectedItems.value = selectedItems.value.filter(itemId => itemId !== id)
    } else {
        selectedItems.value = [...selectedItems.value, id]
    }
}
const resetform = () => {
    form.value.name = '';
    form.value.id = '';
    form.value.des = '';
    selectedParents.value = [];
    selectedItems.value = [];
};

const validateForm = () => {
    errors.value = {}
    if (!form.value.name) errors.value.name = "name is required.";
    return Object.keys(errors.value).length === 0;
}
const submitForm = async () => {
    if (!validateForm()) return;
    const payload = {
        id: form.value.id || null,
        name: form.value.name,
        des: form.value.des,
        function_id: selectedItems.value
    };
    if (form.value.id) {
        // Update existing role
        const response = await axios.post("/api/roles/update", payload);
        if (response.status === 200) {
            await refresh();
            closeModal()
            $swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Update Rote successfully',
                showConfirmButton: false,
                position: "top-end",
                toast: true,
            })
        }
    } else {
        const response = await axios.post("/api/roles/create", payload);
        if (response.status === 200) {
            await refresh();
            closeModal()
            $swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Create Rote successfully',
                showConfirmButton: false,
                position: "top-end",
                toast: true,
            })
        }
    }
}
function confirmDelete(id) {
    roleToDelete.value = id
    showDeleteModal.value = true
}

const deleteRole = async () => {

    try {

        const response = await $fetch(`/api/roles/${roleToDelete.value}/delete`, {
            method: 'DELETE'
        });

        if (response.success) {
            await $swal.fire(
                'Deleted!',
                'The role has been deleted.',
                'success'
            );
            roles.value = roles.value.filter(role => role.id !== roleToDelete.value)
            showDeleteModal.value = false
            roleToDelete.value = null
        }
    } catch (error) {
        $swal.fire(
            'Error!',
            error.data?.message || 'Failed to delete role',
            'error'
        );
    }



}


onMounted(async () => {
    await getfunction_models()
})
</script>

<style scoped>
.form-check-input {
    width: 20px;
    height: 20px;
    accent-color: #194bff;
    box-shadow: none;
}

input {
    box-shadow: none !important;
}
</style>