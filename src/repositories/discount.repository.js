const { Op } = require("sequelize");
const discountModel = require("../models/discountSettings.model");

const DiscountRepository = {
    getAllDiscounts: async () => {
        return await discountModel.findAll();
    },
    getDiscountById: async (id) => {
        return await discountModel.findByPk(id);
    },

    getDiscountsByTicketCount: async (ticketCount) => {
        return await discountModel.findAll({
            where: {
                key: {
                    [Op.eq]: ticketCount,
                },
            },
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
