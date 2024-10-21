// Mock data for items in your shop with aliases for product names (prices in Ghana cedis)
const items = [
    { names: ["dispasable cup big", "dispasable cup large", "d cup b", "d cup l"], unitPrice: 12, bulkPrice:240 , bulkQuantity: 20 },
    { names: ["banana", "yellow banana", "ripe banana"], unitPrice: 1, bulkPrice: 9, bulkQuantity: 10 },
    { names: ["odo tissue mega", "o tissue l", "odo tissue large", "o t l"], unitPrice: 35, bulkPrice: 200, bulkQuantity: 6 },
    { names: ["odo tissue medium", "o tissue m", "", "o t m"], unitPrice: 30, bulkPrice: 160, bulkQuantity: 6 },
    { names: ["odo tissue small", "o tissue s", "", "o t s"], unitPrice: 17, bulkPrice: 200, bulkQuantity: 12 },
    { names: ["tissue small", "tissue s", "t s"], unitPrice: 5, bulkPrice: 75, bulkQuantity: 15 },
    { names: ["dispasable cup brown", "dispasable cup 160 ml brown", "160 ml b", "160 ml cup", "brown cup", "b cup"], unitPrice: 6, bulkPrice: 210, bulkQuantity: 40 },
    { names: ["papper bag large", "gift bag large", "p bag l"], unitPrice: 9, bulkPrice: 90, bulkQuantity: 12 },
    { names: ["thank you bag medium", "thank you medium", "t u bag medium"], unitPrice: 00, bulkPrice: 50, bulkQuantity: 50 },
    { names: ["dispasable cup medium", "d cup m"], unitPrice: 10, bulkPrice: 240, bulkQuantity: 30 },
    { names: ["dispasable cup small", "d cup s"], unitPrice: 5, bulkPrice: 235, bulkQuantity: 60 },
    { names: ["coffee cup", "c cup", "80ml coffee", "80ml c"], unitPrice: 10, bulkPrice: 170, bulkQuantity: 20 },
    { names: ["papper cup", "p cup", "p c"], unitPrice: 50, bulkPrice: 800, bulkQuantity: 20 },
    { names: ["papper bag medium", "p bag m", "p b m", "gift bag medium"], unitPrice: 8, bulkPrice: 85, bulkQuantity: 12 },
    { names: ["papper bag small", "p bag s", "p b s", "gift bag small"], unitPrice: 6, bulkPrice: 55, bulkQuantity: 12 },
    { names: ["orange", "ripe orange", "juicy orange"], unitPrice: 1.5, bulkPrice: 13.5, bulkQuantity: 10 }
  ];
  
  // Store the selected item and its name for later use
  let selectedItem = null;
  let selectedItemName = "";
  
  function checkEnterItem(e) {
    if (e.key === 'Enter') {
      showPrices();
    }
  }
  
  function showPrices() {
    const itemInput = document.getElementById("item-input").value.trim().toLowerCase();
    const chatBox = document.getElementById("chat-box");
  
    // Clear the previous calculation sections
    document.getElementById("quantity-section").style.display = "none";
    document.getElementById("bulk-section").style.display = "none";
  
    // Find the item by checking if the user input matches any of the product names (aliases)
    selectedItem = items.find(item => item.names.includes(itemInput));
  
    if (selectedItem) {
      selectedItemName = selectedItem.names[0]; // Use the primary name for display
  
      let unitPrice = selectedItem.unitPrice;
      let bulkPrice = selectedItem.bulkPrice;
      let bulkQuantity = selectedItem.bulkQuantity;
  
      // Display unit price and bulk price with product name, styled and underlined
      addMessage(`Price for <span style="color:#d9534f; text-decoration: underline;">${selectedItemName.charAt(0).toUpperCase() + selectedItemName.slice(1)}</span>:`, "bot");
      addMessage(`Unit Price: GH₵ ${unitPrice.toFixed(2)} per item`, "bot");
      addMessage(`Bulk Price: GH₵ ${bulkPrice.toFixed(2)} for ${bulkQuantity} pieces`, "bot");
  
      // Show the general quantity input for calculating the total
      document.getElementById("quantity-section").style.display = "block";
  
      // Show the bulk-only calculation section
      document.getElementById("bulk-section").style.display = "block";
    } else {
      addMessage("Item not available", "bot");
      selectedItem = null;
    }
  
    document.getElementById("item-input").value = "";  // Clear item input
  }
  
  function calculateTotal() {
    const quantityInput = document.getElementById("quantity-input").value;
    const chatBox = document.getElementById("chat-box");
  
    if (!selectedItem) return; // No item selected
  
    const quantity = parseInt(quantityInput);
  
    // Calculate total price based on quantity (mix of bulk and unit prices)
    let totalPrice = (quantity >= selectedItem.bulkQuantity)
      ? Math.floor(quantity / selectedItem.bulkQuantity) * selectedItem.bulkPrice + (quantity % selectedItem.bulkQuantity) * selectedItem.unitPrice
      : quantity * selectedItem.unitPrice;
  
    // Display the total price with product name styled and underlined
    addMessage(`Total for <span style="color:#d9534f; text-decoration: underline;">${selectedItemName.charAt(0).toUpperCase() + selectedItemName.slice(1)}</span>: GH₵ ${totalPrice.toFixed(2)}`, "bot");
  
    document.getElementById("quantity-input").value = 1;  // Reset quantity input
  }
  
  function calculateBulkTotal() {
    const bulkQuantityInput = document.getElementById("bulk-quantity-input").value;
    const chatBox = document.getElementById("chat-box");
  
    if (!selectedItem) return; // No item selected
  
    const bulkQuantity = parseInt(bulkQuantityInput);
  
    // Calculate total price for bulk items only
    let bulkTotalPrice = bulkQuantity * selectedItem.bulkPrice;
  
    // Display the bulk total price with product name styled and underlined
    addMessage(`Bulk Total for <span style="color:#d9534f; text-decoration: underline;">${selectedItemName.charAt(0).toUpperCase() + selectedItemName.slice(1)}</span>: GH₵ ${bulkTotalPrice.toFixed(2)}`, "bot");
  
    document.getElementById("bulk-quantity-input").value = 1;  // Reset bulk quantity input
  }
  
  function addMessage(text, sender) {
    const chatBox = document.getElementById("chat-box");
    const message = document.createElement("div");
    message.className = sender;
    message.innerHTML = text;  // Use innerHTML to allow HTML tags (for color/underline)
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;  // Auto-scroll to the bottom
  }
  