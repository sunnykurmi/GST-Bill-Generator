export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const day = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = String(date.getFullYear()).slice(-2);

  return `${day}-${month}-${year}`;
};


export const calculateTaxableAmount = (orders = []) => {
  return orders.reduce((sum, order) => {
    return sum + Number(order.amount || 0);
  }, 0);
};

export const calculateGSTAmount = (taxableAmount, percentage) => {
  return (taxableAmount * percentage) / 100;
};

export const roundOffAmount = (value) => {
  return Math.round(value) - value;
};

export const formatCurrency = (value) => {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
