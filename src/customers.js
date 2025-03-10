import React, { useState } from 'react';
import CustomerDetails from './components/customers/CustomerDetails';
import AddCustomerForm from './components/customers/AddCustomer';
import CustomersTable from './components/customers/CustomersTable2';
import EditCustomer from './components/customers/EditCustomer';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedCustId, setSelectedCustId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const onAddCustomer = () => {
    console.log("Add Customer button clicked");
    setShowAddForm(true);
  };

  const onCloseCustomerDetails = () => {
    setSelectedCustomerId(null); 
  }; 

  const onEditCustomer = (customerId) => {
    console.log("Edit Customer button clicked", customerId);
    setSelectedCustId(customerId); // Set the selected customer for editing
    setShowEditForm(true); // Open the edit form
  };

  const onCloseEditForm = () => {
    setShowEditForm(false); // Close the edit form
    setSelectedCustomerId(null); // Reset the selectedCustomerId to prevent CustomerDetails from reappearing
  };

  return (
    <>
      <CustomersTable
        customers={customers}
        onCustomerClick={setSelectedCustomerId}
        onAddCustomer={onAddCustomer}
        onEditCustomer={onEditCustomer}
      />

      {selectedCustomerId && !showAddForm && (
        <CustomerDetails
          customerId={selectedCustomerId}
          onClose={onCloseCustomerDetails} // Close CustomerDetails without affecting edit form
        />
      )}

      {showAddForm && (
        <AddCustomerForm onClose={() => setShowAddForm(false)} />
      )}
  
    {showEditForm && (
          <EditCustomer
            selectedCustId={selectedCustId}
            onClose={onCloseEditForm} 
          />
        )}
    </>
  );
}

export default Customers;
