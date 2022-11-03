module.exports = {
  // 연습용 쿼리문 예제
  productList : {
    query: `SELECT t1.*, t2.path, t3.category1, t3.category2, t3.category3 
    FROM t_product t1, t_image t2, t_category t3
    WHERE t1.id = t2.product_id AND t2.type = 1 AND t1.category_id = t3.id;`
  },
  productList2: {
    query: `select t3.*, t4.path from (select t1.*, t2.category1, t2.category2, t2.category3 
      from t_product t1, t_category t2
      where t1.category_id = t2.id) t3
      left join (select * from t_image where type=1) t4
      on t3.id = t4.product_id`
  },
  productDetail: {
    query: `SELECT t1.*, t2.path, t3.category1, t3.category2, t3.category3 
    FROM t_product t1, t_image t2, t_category t3
    WHERE t1.id = ? AND t1.id = t2.product_id AND t2.type = 3 AND t1.category_id = t3.id;`
  },
  productMainImages: {
    query: `SELECT * FROM t_image WHERE product_id = ? AND TYPE = 2;`
  },
  productInsert: {
    query: `INSERT INTO t_product (product_name, product_price, delivery_price, 
      add_delivery_price, tags, outbound_days, seller_id, category_id)
      VALUES(?,?,?,?,?,?,?,?);`
  },
  productImageInsert: {
    query: `insert into t_image (product_id, type, path)
    values(?,?,?)`
  },
  productDelete: {
    query: `delete from t_product where id=?`
  },
  sellerList : {
    query: `select * from t_seller`
  },
  signUp: {
    query: `insert into t_user set ? on duplicate key update ?`
  },
  // 졸작용
  insertUserData: {
    query: `INSERT INTO user (email, password, userName) VALUES (?, ?, ?)`
  },
  selectAllUserData: {
    query: `SELECT * FROM user WHERE email = ?`
  },
  updateUserData: {
    query: `UPDATE user SET password = ?, userName = ?, hueApiKey = ? WHERE email = ?`
  },
  deleteUserData: {
    query: `DELETE FROM user WHERE email = ?`
  },
  selectBulbData: {
    query: `SELECT bulb.* FROM bulb JOIN user USING(email) WHERE email = ?`
  },
  insertBulbData: {
    query: `INSERT INTO bulb (id, email, autoBulb, bulbOn, hue, sat, bri, reachable) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  },
  updateBulbData: {
    query: `UPDATE bulb SET autoBulb = ?, bulbOn = ?, hue = ?, sat = ?, bri = ?, reachable = ? where id = ?`
  },
  selectRoomData: {
    query: `SELECT * FROM room_condition WHERE email = ?`
  },
  insertRoomData: {
    query: `INSERT INTO room_condition (email, r_year, r_month, r_day, r_hour, r_minute, temp, humid)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  }
}
