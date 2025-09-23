import { Sidebar } from "../components/large_components/Sidebar";
import { Header } from "../components/base_components/Header";
import { ButtonRed } from "../components/base_components/ButtonRed";
import { SubHeader } from "../components/base_components/SubHeader";
import "../pages_new/styles/inventory.css";
import { InventoryTypeCard } from "../components/large_components/InventoryTypeCard";
import { InventoryAddModal } from "../components/large_components/InventoryAddModal";
import { fetchInventory, fetchInventoryByType, fetchLowStock, getInventoryCounts } from "../utils/InventoryAPI";
import { useState, useEffect } from "react";

const THRESHOLD_STOCK = 20;
const FOOD_MAX_CAP = 500;
const MED_MAX_CAP = 300;
const CLOTHES_MAX_CAP = 200;
const OTHERS_MAX_CAP = 100;

export function InventoryPage()
{
  const [inventory, setInventory] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [inventoryCounts, setInventoryCounts] = useState({
    Food: 0,
    Medicine: 0,
    Clothes: 0,
    Others: 0
  });
  const [viewModal, setViewModal] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedQuantity, setEditedQuantity] = useState(0);

  useEffect(() =>
  {
    loadInventoryData();
    loadLowStockItems();
    loadInventoryCounts();
  }, []);

  async function loadInventoryData(type = "")
  {
    try
    {
      const data = type ? await fetchInventoryByType(type) : await fetchInventory();
      setInventory(data);
    }
    
    catch (error)
    {
      console.error("Error loading inventory:", error);
    }
  }

  async function loadLowStockItems()
  {
    try
    {
      const data = await fetchLowStock();
      setLowStockItems(data);
    }

    catch (error)
    {
      console.error("Error loading low stock items:", error);
    }
  }

  async function loadInventoryCounts()
  {
    try
    {
      const counts = await getInventoryCounts();
      setInventoryCounts(counts);
    }
    
    catch (error)
    {
      console.error("Error loading inventory counts:", error);
    }
  }

  function handleEditStart(item)
  {
    setEditingRowId(item.Goods_id);
    setEditedQuantity(item.Goods_quantity);
  }

  const handleEditCancel = () => {
  setEditingRowId(null);
  };

  async function handleEditSave()
  {
    try
    {
      const res = await fetch(
      `http://localhost:5000/api/inventory/update/${editingRowId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: Number(editedQuantity) }),
      });
    const data = await res.json();
    if (!data.success) 
      throw new Error(data.error);

    loadInventoryData(filterType);
    loadLowStockItems();
    loadInventoryCounts();
    }
    
    catch (err)
    {
      console.error("Failed to update stock:", err);
    }
    
    finally
    {
      setEditingRowId(null);
    }
  }

// Handle key presses in input
  function handleEditKeyDown(e)
  {
    if (e.key === "Enter")
      handleEditSave();
    else if (e.key === "Escape")
      handleEditCancel();
  };


  const handleFilterChange = (e) =>
  {
    const type = e.target.value;
    setFilterType(type);
    
    if (type === "" || type === "None")
    {
      loadInventoryData();
    }
    
    else
    {
      loadInventoryData(type);
    }
  };

  const handleViewModal = () =>
  {
    setViewModal(false);
  };

  const handleItemAdded = () =>
  {
    // Reload all data after adding new item
    loadInventoryData(filterType);
    loadLowStockItems();
    loadInventoryCounts();
  };

  const getStatusClass = (quantity, status) =>
  {
    if (status === 'Low Stock' || quantity < THRESHOLD_STOCK)
    {
      return "low-stock";
    }
    return "in-stock";
  };

  const getStatusText = (quantity, status) =>
  {
    if (status === 'Low Stock' || quantity < THRESHOLD_STOCK)
    {
      return "Low Stock";
    }
    return "In Stock";
  };

  return (
    <>
      <Sidebar></Sidebar>
      <Header title={"Inventory"}></Header>
      <main>
        {lowStockItems.length > 0 &&
          <div className="warning">
            <div className="warning-title">
              <img src="/assets/icons/alert-triangle.svg"></img>
              <p>Warning! Stock low for the following items: </p>
            </div>
            <div className="warning-items">
              {lowStockItems.map((item, index) =>
              (
                <p key={index} className="warning-item">
                  {`${item.Goods_name} (${item.Current_quantity} left)`}
                </p>
              ))}
            </div>
          </div>
        }
        
        <div className="inv-stock-overview">
          <InventoryTypeCard
            maxCapacity={FOOD_MAX_CAP}
            totalItems={inventoryCounts.Food}
            label={"Food"}
            icon={"/assets/icons/food.png"}
          ></InventoryTypeCard>
 
          <InventoryTypeCard
            maxCapacity={MED_MAX_CAP}
            totalItems={inventoryCounts.Medicine}
            label={"Medicine"}
            icon={"/assets/icons/medicine.png"}
          ></InventoryTypeCard>
 
          <InventoryTypeCard
            maxCapacity={CLOTHES_MAX_CAP}
            totalItems={inventoryCounts.Clothes}
            label={"Clothes"}
            icon={"/assets/icons/clothes.png"}
          ></InventoryTypeCard>
 
          <InventoryTypeCard
            maxCapacity={OTHERS_MAX_CAP}
            totalItems={inventoryCounts.Others}
            label={"Others"}
            icon={"/assets/icons/others.png"}
          ></InventoryTypeCard>
        </div>

        <div>
          <div className="inv-subheader">
            <SubHeader title={"Current Inventory"}></SubHeader>
            <div className="inv-add-btn-div">
              <ButtonRed btnText={"Add Item"} onClick={()=>setViewModal(true)}></ButtonRed>
              <input list="filter-inv"
                placeholder="Filter"
                className="inv-filter"
                value={filterType}
                onChange={handleFilterChange}
              ></input>
              <datalist id="filter-inv">
                <option>Food</option>
                <option>Medicine</option>
                <option>Clothes</option>
                <option>Others</option>
                <option>None</option>
              </datalist>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {inventory.map((item) =>
                {
                  const isEditing = item.Goods_id === editingRowId;
                  const handleBlur = () => {
                    if (isEditing) handleEditSave();
                  };

                  return (
                    <tr key={item.Goods_id}>
                      <td>{item.Goods_name}</td>
                      <td>{item.Goods_type}</td>
                      <td onClick={() => handleEditStart(item)}>
                        {isEditing ? 
                          <input
                            type="number"
                            value={editedQuantity}
                            min="0"
                            autoFocus
                            onChange={(e) => setEditedQuantity(e.target.value)}
                            onBlur={handleBlur}
                            onKeyDown={handleEditKeyDown}
                            className="quantity-input"
                          />
                         : 
                          item.Goods_quantity
                        }
                      </td>

                      <td>
                        <span className={getStatusClass(item.Goods_quantity, item.Goods_status)}>
                          {getStatusText(item.Goods_quantity, item.Goods_status)}
                        </span>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {viewModal ?
          <div className="modal-backdrop">
            <InventoryAddModal
              handleState={handleViewModal}
              onItemAdded={handleItemAdded}
            ></InventoryAddModal>
          </div>
        : null
        }
      </main>
    </>
  );
}
