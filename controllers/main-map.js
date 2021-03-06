const GetMainMap = require('../application/use_cases/map/get-main-map');
const GetMainMapData = require('../application/use_cases/map/get-main-map-data');


module.exports = function (dependencies, defaultValues) {
    let {MapRepository} = dependencies;
    let {MarkerRepository} = dependencies;
    let {UserRepository} = dependencies;
    let {ReportRepository} = dependencies;

    const RenderMainMap = (req, res, next) => {
        let GetMainMapUseCase = GetMainMap(MapRepository);
        let {MainMapId} = defaultValues;

        GetMainMapUseCase.Perform(MainMapId).then(() => {
            res.render('main-map', {name: 'Mapa principal'})
        }, (error) => {
            next(error);
        });

    };

    const LoadMainMapData = (req, res, next) => {
        let GetMapDataUseCase = GetMainMapData(UserRepository, MapRepository, MarkerRepository, ReportRepository);
        let {MainMapId} = defaultValues;
        let {email} = req.session;

        GetMapDataUseCase.Perform(email, MainMapId).then(data => {
            data.user.uid = undefined;
            data.user.userId = undefined;
            data.user.email = undefined;
            res.send(JSON.stringify(data));
        }, (error) => {
            next(error);
        });

    };

    return {
        RenderMainMap,
        LoadMainMapData
    };

}