import { useTranslation } from 'react-i18next';

const FeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-slate-500 font-semibold text-light p-4 rounded-md mt-20 mb-5 text-3xl">
          {t('features_section.title')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <div className="text-green-500 text-6xl mb-4">
              <i className="fas fa-truck"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('features_section.free_shipping')}</h3>
            <p className="text-gray-600">{t('features_section.free_shipping_desc')}</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-blue-500 text-6xl mb-4">
              <i className="fas fa-shipping-fast"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('features_section.fast_shipping')}</h3>
            <p className="text-gray-600">{t('features_section.fast_shipping_desc')}</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-yellow-500 text-6xl mb-4">
              <i className="fas fa-headset"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('features_section.support_24_7')}</h3>
            <p className="text-gray-600">{t('features_section.support_24_7_desc')}</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-red-500 text-6xl mb-4">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('features_section.affordable_prices')}</h3>
            <p className="text-gray-600">{t('features_section.affordable_prices_desc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
