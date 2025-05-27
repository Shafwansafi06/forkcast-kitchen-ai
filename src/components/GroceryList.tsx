
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ShoppingCart, Plus, Search, MapPin } from "lucide-react";

const GroceryList = () => {
  const [openCategories, setOpenCategories] = useState({
    produce: true,
    grains: true,
    protein: true,
    condiments: true
  });
  
  const [groceryItems, setGroceryItems] = useState({
    produce: [
      { item: 'Spinach (2 bunches)', checked: false, krogerProduct: null },
      { item: 'Bell peppers (3 mixed colors)', checked: false, krogerProduct: null },
      { item: 'Avocados (2 ripe)', checked: true, krogerProduct: null },
      { item: 'Cherry tomatoes (1 pint)', checked: false, krogerProduct: null },
      { item: 'Broccoli (1 head)', checked: false, krogerProduct: null }
    ],
    grains: [
      { item: 'Quinoa (1 cup)', checked: false, krogerProduct: null },
      { item: 'Brown rice (2 cups)', checked: false, krogerProduct: null },
      { item: 'Sweet potatoes (2 medium)', checked: false, krogerProduct: null }
    ],
    protein: [
      { item: 'Salmon fillets (1 lb)', checked: false, krogerProduct: null },
      { item: 'Chicken breast (1.5 lbs)', checked: false, krogerProduct: null },
      { item: 'Extra firm tofu (1 block)', checked: false, krogerProduct: null },
      { item: 'Eggs (1 dozen)', checked: false, krogerProduct: null }
    ],
    condiments: [
      { item: 'Olive oil (if low)', checked: false, krogerProduct: null },
      { item: 'Tahini (1 jar)', checked: false, krogerProduct: null },
      { item: 'Teriyaki sauce (1 bottle)', checked: false, krogerProduct: null },
      { item: 'Lemons (3)', checked: false, krogerProduct: null }
    ]
  });

  const [newItem, setNewItem] = useState('');
  const [activeCategory, setActiveCategory] = useState('produce');
  const [nearestStore, setNearestStore] = useState(null);
  const [searchingProducts, setSearchingProducts] = useState(false);

  // Mock Kroger API integration (replace with actual API calls)
  const searchKrogerProduct = async (itemName) => {
    setSearchingProducts(true);
    try {
      // This would be replaced with actual Kroger API call
      // For now, return mock data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      const mockProduct = {
        id: Math.random().toString(36).substr(2, 9),
        name: itemName,
        price: (Math.random() * 10 + 1).toFixed(2),
        brand: 'Generic Brand',
        size: '1 lb',
        available: true
      };
      
      return mockProduct;
    } catch (error) {
      console.error('Error searching Kroger products:', error);
      return null;
    } finally {
      setSearchingProducts(false);
    }
  };

  const findNearestKrogerStore = async () => {
    try {
      // Mock store location (replace with actual Kroger Location API)
      const mockStore = {
        id: 'store123',
        name: 'Kroger #123',
        address: '123 Main St, Your City, ST 12345',
        distance: '2.1 miles',
        phone: '(555) 123-4567'
      };
      
      setNearestStore(mockStore);
      toast.success('Found nearest Kroger store!');
    } catch (error) {
      console.error('Error finding Kroger store:', error);
      toast.error('Unable to find nearest store');
    }
  };

  const toggleCategory = (category) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const toggleItemCheck = (category, index) => {
    setGroceryItems(prev => ({
      ...prev,
      [category]: prev[category].map((item, i) => 
        i === index ? { ...item, checked: !item.checked } : item
      )
    }));
  };

  const addNewItem = async () => {
    if (!newItem.trim()) return;
    
    const krogerProduct = await searchKrogerProduct(newItem);
    
    setGroceryItems(prev => ({
      ...prev,
      [activeCategory]: [
        ...prev[activeCategory],
        { 
          item: newItem, 
          checked: false, 
          krogerProduct 
        }
      ]
    }));
    
    setNewItem('');
    toast.success('Item added to grocery list!');
  };

  const generateListFromMealPlan = () => {
    const mealPlan = localStorage.getItem('forkcast_meal_plan');
    if (!mealPlan) {
      toast.error('No meal plan found. Create a meal plan first!');
      return;
    }
    
    // Logic to extract ingredients from meal plan would go here
    toast.success('Grocery list generated from your meal plan!');
  };

  useEffect(() => {
    findNearestKrogerStore();
  }, []);

  const categoryIcons = {
    produce: '🥬',
    grains: '🌾', 
    protein: '🥩',
    condiments: '🍯'
  };

  const categoryNames = {
    produce: 'Produce',
    grains: 'Grains & Starches',
    protein: 'Protein',
    condiments: 'Condiments & Oils'
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Smart Grocery List</h1>
          <p className="text-slate-400 mt-2">Powered by Kroger integration</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={generateListFromMealPlan}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            📋 Generate from Meal Plan
          </Button>
          <Button 
            onClick={() => window.print()}
            variant="outline" 
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            🖨️ Print
          </Button>
        </div>
      </div>

      {/* Nearest Store Info */}
      {nearestStore && (
        <Card className="bg-blue-600/10 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-400" />
              <div>
                <h3 className="text-white font-medium">{nearestStore.name}</h3>
                <p className="text-slate-400 text-sm">{nearestStore.address} • {nearestStore.distance}</p>
              </div>
              <Button 
                className="ml-auto bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => window.open(`tel:${nearestStore.phone}`)}
              >
                📞 Call Store
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add New Item */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add new grocery item..."
              className="bg-slate-700 border-slate-600 text-slate-300"
              onKeyPress={(e) => e.key === 'Enter' && addNewItem()}
            />
            <select 
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="bg-slate-700 border border-slate-600 rounded px-3 text-slate-300"
            >
              {Object.entries(categoryNames).map(([key, name]) => (
                <option key={key} value={key}>{name}</option>
              ))}
            </select>
            <Button 
              onClick={addNewItem}
              disabled={searchingProducts}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Grocery Categories */}
      <div className="space-y-4">
        {Object.entries(groceryItems).map(([category, items]) => (
          <Card key={category} className="bg-slate-800/50 border-slate-700">
            <Collapsible 
              open={openCategories[category]} 
              onOpenChange={() => toggleCategory(category)}
            >
              <CollapsibleTrigger className="w-full">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{categoryIcons[category]}</span>
                    <span className="text-white font-semibold text-lg">{categoryNames[category]}</span>
                    <span className="text-slate-500 text-sm">
                      ({items.filter(item => !item.checked).length} remaining)
                    </span>
                  </div>
                  <span className="text-slate-400">
                    {openCategories[category] ? '▲' : '▼'}
                  </span>
                </CardContent>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="px-4 pb-4 pt-0">
                  <div className="space-y-3">
                    {items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between bg-slate-700/30 rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <Checkbox 
                            checked={item.checked}
                            onCheckedChange={() => toggleItemCheck(category, index)}
                          />
                          <div>
                            <span className={`text-slate-300 ${item.checked ? 'line-through opacity-60' : ''}`}>
                              {item.item}
                            </span>
                            {item.krogerProduct && (
                              <div className="text-xs text-green-400">
                                ${item.krogerProduct.price} • {item.krogerProduct.brand}
                              </div>
                            )}
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => toast.success('Added to Kroger cart!')}
                        >
                          🛒 Add to Cart
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      {/* Kroger Integration */}
      <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-blue-500/20">
        <CardContent className="p-6">
          <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Shop with Kroger
          </h3>
          <div className="flex gap-4">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
              onClick={() => toast.success('Opening Kroger cart...')}
            >
              🛒 View Kroger Cart
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white flex-1"
              onClick={() => toast.success('Starting Kroger pickup order...')}
            >
              📦 Schedule Pickup
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroceryList;
