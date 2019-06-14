module.exports = function (app, redFabric) {
   
    /**
     * GET all medics
     */
    app.get("/api/medics", function (req, res) {
        redFabric.init().then(function() {
          return redFabric.queryAllMedics()
        }).then(function (data) {
          res.status(200).json(data)
        }).catch(function(err) {
          res.status(500).json({error: err.toString()})
        })
    });

    /**
     * GET medic : id
     */
    app.get("/api/medic/:id", function (req, res) {
      var id = req.params.id;
      redFabric.init().then(function() {
        return redFabric.queryMedic(id)
      }).then(function (data) {
        res.status(200).json(data)
      }).catch(function(err) {
        res.status(500).json({error: err.toString()})
      })
  });

  /**
     * DELETE medic : id
     */
    app.delete("/api/medic/:id", function (req, res) {
      var id = req.params.id;
      redFabric.init().then(function() {
        return redFabric.deleteMedic(id)
      }).then(function (data) {
        res.status(200).json(data)
      }).catch(function(err) {
        res.status(500).json({error: err.toString()})
      })
  });

    /**
     * POST -> add medic
     */
    app.post("/api/medic", function (req, res) {
      var medics = null
      redFabric.init().then(function() {
        return redFabric.queryAllMedics()
      }).then(function (data) {
        medics = data;
        var count = Object.keys(medics).length;
        var num = parseInt(medics[count-1]['Key'].replace('MEDIC',''),10)+1;
        var id = 'MEDIC'+num;
        var medic = {
          id : id,
          nombre : req.body.nombre,
          principioActivo : req.body.principioActivo,
          formato : req.body.formato,
          propietario : req.body.propietario
        };
        redFabric.init().then(function() {
          return redFabric.add_medic(medic)
        }).then(function (data) {
          res.status(200).json(data)
        }).catch(function(err) {
          res.status(500).json({error: err.toString()})
        })
      }).catch(function(err) {
        res.status(500).json({error: err.toString()})
      })
    });

    /**
     * PUT -> update medic
     */
    app.put("/api/medic/:id", function (req, res) {
      var id = req.params.id;
      var medic = {
        id : id,
        nombre : req.body.nombre,
        principioActivo : req.body.principioActivo,
        formato : req.body.formato,
        propietario : req.body.propietario
      };
      redFabric.init().then(function() {
        return redFabric.add_medic(medic)
      }).then(function (data) {
        res.status(200).json(data)
      }).catch(function(err) {
        res.status(500).json({error: err.toString()})
      })
    });


};
