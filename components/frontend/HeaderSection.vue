<template>
  <header id="header" class="header d-flex align-items-center fixed-top">
    <div class="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">

      <a href="index.html" class="logo d-flex align-items-center">
        <h1 class="sitename">7S Company Limited </h1>
      </a>

      <nav id="navmenu" class="navmenu">
        <ul>
          <li><a href="#hero" class="active">{{ $t('home') }}</a></li>
          <li><a href="#about">{{ $t('about') }}</a></li>
          <li><a href="#features">{{ $t('features') }}</a></li>
          <li><a href="#gallery">{{ $t('gallery') }}</a></li>
          <li><a href="#team">{{ $t('team') }}</a></li>
          <li><a href="#pricing">{{ $t('pricing') }}</a></li>
          <li><a href="#contact">{{$t('contact')}}</a></li>
          <li class="nav-item dropdown language-dropdown ">
            <a class="nav-link dropdown-toggle" href="#" id="languageDropdown" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              <span v-if="locale === 'en'">{{$t('english')}}</span>
              <span v-if="locale === 'lo'">{{$t('lao')}}</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
              <li>
                <button @click="setLocale('lo')" class="dropdown-item">
                  <i class="fi fi-la me-2"></i> {{$t('lao')}}
                </button>
              </li>
              <li>
                <button @click="setLocale('en')" class="dropdown-item">
                  <i class="fi fi-us me-2"></i> {{$t('english')}}
                </button>
              </li>
            </ul>
          </li>
          <NuxtLink class="btn-login" to="/login" @click="isProductDropdownOpen = false">
                  {{ $t('login') }}
          </NuxtLink>

        </ul>
        <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
      </nav>
    </div>
  </header>
</template>

<script setup>
import 'flag-icons/css/flag-icons.min.css';
const { locales, setLocale, locale } = useI18n();
</script>

<style scoped>
.btn-login {
  padding: 10px 28px 12px 28px !important;

}
</style>