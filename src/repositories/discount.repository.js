const { Op, Sequelize } = require("sequelize");
const discountModel = require("../models/discountSettings.model");

const DiscountRepository = {
    getAllDiscounts: async () => {
        return await discountModel.findAll();
    },
    getDiscountById: async (id) => {
        return await discountModel.findByPk(id);
    },

    getDiscountsByTicketCount: async (ticketCount) => {
        const all = await discountModel.findAll();
        return all.filter((record) => {
            try {
                const meta = JSON.parse(record.metadata);
                return meta.count === ticketCount;
            } catch {
                return false;
            }
        });
    },

    createDiscount: async (discountData) => {
        return await discountModel.create(discountData);
    },
    updateDiscount: async (id, discountData) => {
        const discount = await discountModel.findByPk(id);
        if (!discount) return null;
        await discount.update(discountData);
        return discount;
    },
    deleteDiscount: async (id) => {
        const discount = await discountModel.findByPk(id);
        if (!discount) return null;
        await discount.destroy();
        return discount;
    },
};

module.exports = DiscountRepository;
