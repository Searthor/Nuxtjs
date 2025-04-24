<template>
    <div>
        <HeaderSection />
        <main class="main">
            <!-- Hero Section -->
            <HeroSection />
            <!-- About Section -->
            <AboutSection />
            <!-- /About Section -->

            <!-- Features Section -->
            <FeaturesSection />
            <!-- /Features Section -->
            <!-- Stats Section -->
            <StatsSection />
            <!-- /Stats Section -->

            <!-- Details Section -->
          
            <!-- /Details Section -->

            <!-- Gallery Section -->
            <GallerySection />
            <!-- /Gallery Section -->
            <!-- Team Section -->
            <TeamSection />
            <!-- /Team Section -->

            <!-- Pricing Section -->
            <PricingSection />
            <!-- /Pricing Section -->
            <!-- Faq Section -->
            <FaqSection />
            <!-- /Faq Section -->
            <!-- Contact Section -->
            <ContactSection />
            <!-- /Contact Section -->
        </main>

        <FooterSection />
        <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i
                class="bi bi-arrow-up-short"></i></a>
    </div>
</template>
<script setup>
import HeaderSection from '../components/frontend/HeaderSection.vue'
import HeroSection from '../components/frontend/HeroSection.vue'
import AboutSection from '../components/frontend/AboutSection.vue'
import FeaturesSection from '../components/frontend/FeaturesSection.vue'
import StatsSection from '../components/frontend/StatsSection.vue'
import FooterSection from '../components/frontend/FooterSection.vue'
import ContactSection from '../components/frontend/ContactSection.vue'
import FaqSection from '../components/frontend/FaqSection.vue'
import PricingSection from '../components/frontend/PricingSection.vue'
import TeamSection from '../components/frontend/TeamSection.vue'
import GallerySection from '../components/frontend/GallerySection.vue'
import DetailsSection from '../components/frontend/DetailsSection.vue'
definePageMeta({
    layout: false
})
const { $glightbox } = useNuxtApp()

onMounted(() => {
    const lightbox = $glightbox({
        selector: '.glightbox'
    })
})
</script>
