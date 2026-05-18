const discountMode = require("../models/discountSettings.model");

const DiscountRepository = {
  getAllDiscounts: async () => {
    return await discountMode.findAll();
  },
  getDiscountById: async (id) => {
    return await discountMode.findByPk(id);
  },

  getDiscountsByTicketCount: async (ticketCount) => {
    return await discountMode.findAll({
      where: {
        key: {
          [Op.lte]: ticketCount,
        },
      },
      order: [["key", "DESC"]],
    });
  },

  createDiscount: async (discountData) => {
    return await discountMode.create(discountData);
  },
  updateDiscount: async (id, discountData) => {
    const discount = await discountMode.findByPk(id);
    if (!discount) return null;
    await discount.update(discountData);
    return discount;
  },
  deleteDiscount: async (id) => {
    const discount = await discountMode.findByPk(id);
    if (!discount) return null;
    await discount.destroy();
    return discount;
  },
};
