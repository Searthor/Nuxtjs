<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow">
    <div class="container-fluid px-8">
      <NuxtLink class="navbar-brand " to="/">Shipping Express</NuxtLink>
      <button class="navbar-toggler " type="button" @click="toggleMenu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div :class="menuClasses" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <!-- products -->
          <li class="nav-item dropdown" @mouseenter="isProductDropdownOpen = true"
            @mouseleave="isProductDropdownOpen = false">
            <a class="nav-link dropdown-toggle" href="#" @click.prevent="toggleProductDropdown">
              <i class="bi bi-gear"></i>
              {{ $t("settings") }}
            </a>
            <ul class="dropdown-menu" :class="{ show: isProductDropdownOpen }">
              <li v-if="$checkPermission('access_role')">
                <NuxtLink class="dropdown-item" to="/settings/roles" @click="isProductDropdownOpen = false">
                  <i class="bi bi-lock"></i>
                  {{ $t("roles") }}
                </NuxtLink>
              </li>
              <li v-if="$checkPermission('access_user')">
                <NuxtLink class="dropdown-item" to="/settings/users" @click="isProductDropdownOpen = false">
                  <i class="bi bi-person"></i>
                  {{ $t("users") }}
                </NuxtLink>
              </li>
            </ul>
          </li>
          <!-- reports -->
        </ul>

        <li class="nav-item dropdown language-dropdown language-switcher">
          <a class="nav-link dropdown-toggle" href="#" id="languageDropdown" role="button" data-bs-toggle="dropdown"
            aria-expanded="false">

            <span v-if="locale === 'en'"><i class="fi fi-us me-1"></i> EN</span>
            <span v-if="locale === 'lo'"><i class="fi fi-la me-1"></i> LA</span>
          </a>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
            <li>
              <button @click="setLocale('lo')" class="dropdown-item">
                <i class="fi fi-la me-2"></i> Lao
              </button>
            </li>
            <li>
              <button @click="setLocale('en')" class="dropdown-item">
                <i class="fi fi-us me-2"></i> English
              </button>
            </li>
          </ul>
        </li>

        <div class="d-flex">
          <a href="javascript:void(0)" class="nav-link flex flex-row align-items-center" @click="openModal">
            <img src="../public/images/logo.jpg" style="width: 30px; height: 30px" alt="Profile"
              class="brand-image img-circle elevation-3 mr-1" />
            Admin
          </a>
        </div>
      </div>
    </div>
  </nav>
  <!-- modal-logout -->
  <div v-if="showModal" class="modal fade show" style="display: block; background: rgba(0, 0, 0, 0.5)">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title" style="font-size: 1.5rem">
            {{ $t("logout") }}
          </h1>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center">
          <h2 style="font-size: 1.4rem">ທ່ານຕ້ອງການອອກລະບົບບໍ ?</h2>
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-danger" @click="closeModal">
            <i class="fa fa-times"></i> ຍົກເລີກ
          </button>
          <button type="button" class="btn btn-primary" @click="handleLogout">
            <i class="fa-solid fa-right-to-bracket"></i>
            ຕົກລົງ
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- end -->
  <main class="h-100 p-4">
    <slot />
  </main>
</template>

<script setup>
import 'flag-icons/css/flag-icons.min.css';
import { useRouter } from "vue-router";
const router = useRouter();
function handleLogout() {
  localStorage.removeItem("token");
  router.push("/login");
}
const showModal = ref(false);
const isMenuOpen = ref(false);
const windowWidth = ref(process.client ? window.innerWidth : 0); // Initialize safely
const { locales, setLocale, locale } = useI18n();




const isProductDropdownOpen = ref(false)

const toggleProductDropdown = () => {
  isProductDropdownOpen.value = !isProductDropdownOpen.value
}
const updateWidth = () => {
  if (process.client) {
    windowWidth.value = window.innerWidth;
  }
};


// Compute classes dynamically based on screen size
const menuClasses = computed(() => {
  return {
    "collapse navbar-collapse": windowWidth.value < 992 && !isMenuOpen.value,
    "navbar-collapse": windowWidth.value >= 992 || isMenuOpen.value,
  };
});

// Add event listener to detect screen resize
onMounted(() => {
  if (process.client) {
    window.addEventListener("resize", updateWidth);
    // Initialize width on mount
    updateWidth();
  }
});

// Remove event listener on unmount
onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener("resize", updateWidth);
  }
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const logout = () => {
  // Implement your logout logic here
  console.log('Logging out...');
  closeModal();
};
</script>
<style>
.dropdown-menu {
  display: none;
}

.dropdown-menu.show {
  display: block;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.language-switcher {
  margin-right: 1rem;
  padding: .2rem .4rem;
  outline: none;
  border-radius: 5px;
  border: 1px solid rgba(31, 77, 81, 0.53);

}

@media (min-width: 992px) {
  .dropdown-menu {
    position: absolute;
  }
}


.language-dropdown {
  position: relative;
  display: inline-block;
}

.language-toggle {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  padding: 10px;
}

.language-toggle i {
  margin-right: 5px;
}

.language-dropdown .dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 120px;
  background: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  display: none;
  /* Hide initially */
}

.language-dropdown:hover .dropdown-menu {
  display: block;
  /* Show on hover */
}

.language-dropdown .dropdown-item {
  display: flex;
  align-items: center;
  padding: 8px 15px;
  color: #333;
  font-size: 14px;
  transition: background 0.3s;
}

.language-dropdown .dropdown-item:hover {
  background: #f8f9fa;
  color: #007bff;
}

.language-dropdown .dropdown-item i {
  margin-right: 10px;
}
</style>