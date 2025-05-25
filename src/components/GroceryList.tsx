
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

const GroceryList = () => {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    produce: true,
    grains: true,
    protein: true,
    condiments: true
  });

  const groceryData = {
    produce: [
      { item: 'Spinach (2 bunches)', checked: false },
      { item: 'Bell peppers (3 mixed colors)', checked: false },
      { item: 'Avocados (2 ripe)', checked: true },
      { item: 'Cherry tomatoes (1 pint)', checked: false },
      { item: 'Broccoli (1 head)', checked: false }
    ],
    grains: [
      { item: 'Quinoa (1 cup)', checked: false },
      { item: 'Brown rice (2 cups)', checked: false },
      { item: 'Sweet potatoes (2 medium)', checked: false }
    ],
    protein: [
      { item: 'Salmon fillets (1 lb)', checked: false },
      { item: 'Chicken breast (1.5 lbs)', checked: false },
      { item: 'Extra firm tofu (1 block)', checked: false },
      { item: 'Eggs (1 dozen)', checked: false }
    ],
    condiments: [
      { item: 'Olive oil (if low)', checked: false },
      { item: 'Tahini (1 jar)', checked: false },
      { item: 'Teriyaki sauce (1 bottle)', checked: false },
      { item: 'Lemons (3)', checked: false }
    ]
  };

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Grocery List</h1>
        <div className="flex gap-3">
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            🖨️ Print
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            🛒 Buy Ingredients
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Produce */}
        <Card className="bg-slate-800/50 border-slate-700">
          <Collapsible 
            open={openCategories.produce} 
            onOpenChange={() => toggleCategory('produce')}
          >
            <CollapsibleTrigger className="w-full">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🥬</span>
                  <span className="text-white font-semibold text-lg">Produce</span>
                </div>
                <span className="text-slate-400">
                  {openCategories.produce ? '▲' : '▼'}
                </span>
              </CardContent>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="px-4 pb-4 pt-0">
                <div className="space-y-3">
                  {groceryData.produce.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-700/30 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <Checkbox checked={item.checked} />
                        <span className={`text-slate-300 ${item.checked ? 'line-through opacity-60' : ''}`}>
                          {item.item}
                        </span>
                      </div>
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-600">
                        Buy
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Grains & Starches */}
        <Card className="bg-slate-800/50 border-slate-700">
          <Collapsible 
            open={openCategories.grains} 
            onOpenChange={() => toggleCategory('grains')}
          >
            <CollapsibleTrigger className="w-full">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌾</span>
                  <span className="text-white font-semibold text-lg">Grains & Starches</span>
                </div>
                <span className="text-slate-400">
                  {openCategories.grains ? '▲' : '▼'}
                </span>
              </CardContent>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="px-4 pb-4 pt-0">
                <div className="space-y-3">
                  {groceryData.grains.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-700/30 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <Checkbox checked={item.checked} />
                        <span className={`text-slate-300 ${item.checked ? 'line-through opacity-60' : ''}`}>
                          {item.item}
                        </span>
                      </div>
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-600">
                        Buy
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Protein */}
        <Card className="bg-slate-800/50 border-slate-700">
          <Collapsible 
            open={openCategories.protein} 
            onOpenChange={() => toggleCategory('protein')}
          >
            <CollapsibleTrigger className="w-full">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🥩</span>
                  <span className="text-white font-semibold text-lg">Protein</span>
                </div>
                <span className="text-slate-400">
                  {openCategories.protein ? '▲' : '▼'}
                </span>
              </CardContent>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="px-4 pb-4 pt-0">
                <div className="space-y-3">
                  {groceryData.protein.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-700/30 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <Checkbox checked={item.checked} />
                        <span className={`text-slate-300 ${item.checked ? 'line-through opacity-60' : ''}`}>
                          {item.item}
                        </span>
                      </div>
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-600">
                        Buy
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Condiments & Oils */}
        <Card className="bg-slate-800/50 border-slate-700">
          <Collapsible 
            open={openCategories.condiments} 
            onOpenChange={() => toggleCategory('condiments')}
          >
            <CollapsibleTrigger className="w-full">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🍯</span>
                  <span className="text-white font-semibold text-lg">Condiments & Oils</span>
                </div>
                <span className="text-slate-400">
                  {openCategories.condiments ? '▲' : '▼'}
                </span>
              </CardContent>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="px-4 pb-4 pt-0">
                <div className="space-y-3">
                  {groceryData.condiments.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-700/30 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <Checkbox checked={item.checked} />
                        <span className={`text-slate-300 ${item.checked ? 'line-through opacity-60' : ''}`}>
                          {item.item}
                        </span>
                      </div>
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-600">
                        Buy
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      </div>

      {/* Order Groceries Online */}
      <Card className="bg-slate-800/30 border-slate-700">
        <CardContent className="p-6">
          <h3 className="text-white text-lg font-semibold mb-4">Order Groceries Online</h3>
          <div className="flex gap-4">
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 flex-1">
              🛒 Amazon Fresh
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white flex-1">
              🥕 Instacart
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroceryList;
