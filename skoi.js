Skoi = function() {
	var o = {
		version : '0.1.1',
		mapS2T : {
			'ุ': 'ู',
			'ภ': 'พ',
			'ฑ': 'ท',
			'ณ': 'น',
			'ญ': 'ย',
			'ฐ': 'ถ',
			'ฎ': 'ด',
			'ธ': 'ท',
			'ฆ': 'ม',
			'ฒ': 'ม',
			'ฌ': 'ม',
			'ฏ': 'ต',
			'ฆ': 'ข',
			'ช๋': 'ฉ',
			'ฮ': 'อ',
			'ษ': 'ส',
			'ฯ' : 'น',
			'ฤ' : 'ร',
			'ฦ' : 'ล',
			'ู([่้๊๋])ว' : 'ู$1',
			'([ก-ฮ])([่้๊๋])([ก-ฮ][^ก-ฮเแโไใ])' : '$1ะ$3',
			'([ก-ฮ])([่้๊๋])(ห[งญณนมยรลวฬ][^ก-ฮเแโไใ])' : '$1ะ$3',
			'([ก-ฮ])([่้๊๋])([กขคจปบฟพผฝสษศ][รล][^ก-ฮเแโไใ])' : '$1ะ$3',
			'([ก-ฮ])([่้๊๋])(\\s)' : '$1ะ$3',
			'([ก-ฮ])([่้๊๋])$' : '$1ะ',
			'ั๊ข': 'ัก'
		},
		toThai : function(s) {
			var reg = new RegExp();
			s = this.prune(s);
			for(m in this.mapS2T) {
				reg.compile(m, 'g');
				s = s.replace(reg, this.mapS2T[m]);
			}
			s = this.postprocess(s);
			return s;
		},
		prune : function(s) {
			var reg = new RegExp('.์', 'g');
			s = s.replace(reg, '');
			return s;
		},
		postprocess : function(s) {
			return s;
		}
	};
	return o;
}

String.prototype.skoi_to_thai = function() {
	return (new Skoi()).toThai(this);
};
