import { BASE_URL } from "./api";

export async function fetchInventory()
{
  try
  {
    const response = await fetch(`${BASE_URL}/api/inventory`);
    if (!response.ok)
      throw new Error('Failed to fetch inventory');
    return await response.json();
  }
  
  catch (error)
  {
    console.error('Error fetching inventory:', error);
    return [];
  }
}

export async function fetchInventoryByType(type)
{
  try
  {
    const response = await fetch(`${BASE_URL}/api/inventory/type/${type}`);
    if (!response.ok)
      throw new Error('Failed to fetch inventory by type');
    return await response.json();
  }
  
  catch (error)
  {
    console.error('Error fetching inventory by type:', error);
    return [];
  }
}

export async function fetchLowStock()
{
  try
  {
    const response = await fetch(`${BASE_URL}/api/inventory/low-stock`);
    if (!response.ok)
      throw new Error('Failed to fetch low stock items');
    return await response.json();
  }
  
  catch (error)
  {
    console.error('Error fetching low stock items:', error);
    return [];
  }
}

export async function addInventoryItem(itemData)
{
  try
  {
    const response = await fetch(`${BASE_URL}/api/inventory`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(itemData)
    });
    
    if (!response.ok)
      throw new Error('Failed to add inventory item');
    return await response.json();
  }
  
  catch (error)
  {
    console.error('Error adding inventory item:', error);
    throw error;
  }
}

export async function getInventoryCounts()
{
  try
  {
    const response = await fetch(`${BASE_URL}/api/inventory/counts`);
    if (!response.ok)
      throw new Error('Failed to fetch inventory counts');
    return await response.json();
  }
  
  catch (error)
  {
    console.error('Error fetching inventory counts:', error);
    return { Food: 0, Medicine: 0, Clothes: 0, Others: 0 };
  }
}
