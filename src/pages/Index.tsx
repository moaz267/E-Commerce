import Layout from '@/components/layout/Layout';
import HeroSlider from '@/components/home/HeroSlider';
import CollectionBanners from '@/components/home/CollectionBanners';
import ProductGrid from '@/components/home/ProductGrid';
import FeaturedBanner from '@/components/home/FeaturedBanner';
import Testimonials from '@/components/home/Testimonials';
import InstagramSection from '@/components/home/InstagramSection';

const Index = () => {
  return (
    <Layout>
      <HeroSlider />
      <CollectionBanners />
      <ProductGrid />
      <FeaturedBanner />
      <Testimonials />
      <InstagramSection />
    </Layout>
  );
};

export default Index;
