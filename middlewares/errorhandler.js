
module.exports.wrapError =
	 (fn) =>{
		return (req, res, next) => {
			const routePromise = fn(req, res, next);
			if (routePromise.catch) {
				routePromise.catch(error => {
					console.log(error)
					if (!error)
						next('oops! something broke')
					var err = {
							message: error.message,
							name: error.name,
							code:error.code,
							
					};

					next(JSON.stringify(err))
				});
			}
		}
	};