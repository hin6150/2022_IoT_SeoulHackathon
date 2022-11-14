module.exports = {
  selectAirData: {
    query: `SELECT * FROM airData ORDER BY obsDate DESC;`
  },
  selectAirDataOnDate: { // ? type -> text(VARCHAR) -> '202211100000' -> yyyymmddhhmm
    query: `SELECT * FROM airData WHERE obsDate > ? and obsDate < ? ORDER BY obsDate ASC;`
  },
  selectAirDataColumnName: {
    query: `SELECT COLUMN_NAME
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA='hong' AND TABLE_NAME='airData' AND 
    COLUMN_NAME IN (?, ?, ?, ?, ?, ?)
    ORDER BY 
    FIELD(COLUMN_NAME, ?, ?, ?, ?, ?, ?)`
  },
  selectAirDataAVG: { // ? : yyyymmddhhmm
    query: `SELECT AVG(sub.avgNoise) as noise, sub.serial, ((AVG(sub.avgTemp) / 10) - 100) as temp, AVG(sub.avgHum) as hum, AVG(sub.avgFineDust) as fineDust,
    AVG(sub.avgUtFineDust) as utraFineDust, sub.floor, sub.facility, sub.obsDate
    FROM (SELECT A.serial, A.obsDate, AVG(A.temp) as avgTemp, AVG(A.hum) as avgHum, AVG(A.fineDust) as avgFineDust,
    AVG(A.utraFineDust) as avgUtFineDust, AVG(A.noise) as avgNoise, B.floor, B.facility
    FROM hong.airData as A join hong.airSensor_info as B on A.serial = B.serial 
    where obsDate > ? and obsDate < ?
    group by serial
    order by floor ASC) as sub
    group by sub.floor;`
  },
  selectParkingData: {
    query: `select * from parkingData`
  },
  selectParkingDataLatest: {
    query: `SELECT * FROM hong.parkingData AS A JOIN hong.parkingData_info AS B 
    ON A.serial = B.serial ORDER BY A.obsDate DESC, A.serial ASC LIMIT 3`
  },
  selectParkingDataAVG: { // ? : yyyymmddhh
    query: `SELECT serial, obsDate, parkingSpace, AVG(currentSpace) as avgCurrent, AVG(emptySpace) as avgEmpty 
    FROM parkingData WHERE obsDate > ? AND obsDate < ? GROUP BY serial`
  },
  selectParkingDataAVGTime: { // REGEXP : '........@@|........@@' -> yyyymmdd@@, |:OR
    query: `SELECT serial, obsDate, parkingSpace, AVG(currentSpace) as avgCurrent, AVG(emptySpace) as avgEmpty
    FROM parkingData 
    WHERE obsDate > ? AND obsDate < ? AND
    obsDate REGEXP (?)
    GROUP BY serial;`
  }
}
