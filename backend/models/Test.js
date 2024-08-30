module.exports = (sequelize, DataTypes) => {
    const Test = sequelize.define('Test', {
        test_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        payment_proof: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });

    return Test;
};
