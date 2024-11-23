const FeaturesSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto text-center">
        <h2 className='text-slate-500 font-semibold text-light p-4 rounded-md mt-20 mb-5 text-3xl'>
          Nos Avantages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="flex flex-col items-center">
            <div className="text-green-500 text-6xl mb-4">
              <i className="fas fa-truck"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Livraison Gratuite</h3>
            <p className="text-gray-600">Profitez de la livraison gratuite sur toutes vos commandes.</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="text-blue-500 text-6xl mb-4">
              <i className="fas fa-shipping-fast"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Livraison Rapide</h3>
            <p className="text-gray-600">Nous livrons vos produits dans les plus brefs délais.</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="text-yellow-500 text-6xl mb-4">
              <i className="fas fa-headset"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Support 24/7</h3>
            <p className="text-gray-600">Notre équipe est disponible pour répondre à vos questions.</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="text-red-500 text-6xl mb-4">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Prix Abordables</h3>
            <p className="text-gray-600">Des prix compétitifs pour une qualité exceptionnelle.</p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
