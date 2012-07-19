Skoi = function() {
	var o = {
		version : '0.1.3',
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
			'([ก-ฮ่้๊๋ัุูิีึื])[ขฅฃคฆ]$': '$1ก',
			'([ก-ฮ่้๊๋ัุูิีึื])[ลณญฬ]$': '$1น'
		},
		charMap : {
			frontVowel : /[เแไใโ]/,
			saraA : /[ะ]/,
			tone : /[\u0E47-\u0E4B]/,
			singleBoundary : /[ๆ ]/,
			upperOrLowerVowel : /[\u0E31\u0E34-\u0E39]/
		},
		segment : function(s) {
			var out = [];
			var buffer = "";
			for (var i = 0; i < s.length; i++) {
				if (this.charMap.frontVowel.test(s[i])) {
					if (buffer != '') {
						out.push(buffer);
						buffer = "";
					}
					buffer += s[i];
				} else {
					if (this.charMap.saraA.test(s[i])) {
						buffer += s[i];
						out.push(buffer);
						buffer = "";
					} else {
						if (this.charMap.singleBoundary.test(s[i])) {
							if (buffer != '') {
								out.push(buffer);
								buffer = "";
							}
							out.push(s[i]);
						}	else {
							if (this.charMap.tone.test(s[i])) {
								console.log("BUFFER="+buffer);
								if (buffer.length > 1) {
									var l1 = buffer.substr(buffer.length - 1, 1);
									var l2 = '';
									var lpatch = '';
									if (this.charMap.upperOrLowerVowel.test(l1)) { // upper,lower vowel
										if (buffer.length > 2) {
											l2 = buffer.substr(buffer.length - 3, 2);
										} else {
											buffer += s[i];
											continue;
										}
										lpatch = l1;
										console.log('upper or lower vowel found->L2='+l2);
									} else {
										l2 = buffer.substr(buffer.length - 2, 2);
										console.log('NO upper or lower vowel found->L2='+l2);
									}
									var l21 = l2.substr(0, 1);
									if (this.charMap.tone.test(l21)) { // tone
										l2 = l2.substr(l2.length - 1, 1);
										console.log("Ah!");
									}
									console.log("L1="+l1);
									console.log("L2="+l2);
									console.log("LPatch="+lpatch);
									if ((l2 == 'กร') || (l2 == 'กล') || (l2 == 'คล') || (l2 == 'คร') || 
										(l2 == 'ปล') || (l2 == 'ปร') || (l2 == 'คว') || (l2 == 'กว') || 
										(l2 == 'ตร') || (l2 == 'จร') || (l2 == 'พร') || (l2 == 'พล') || 
										(l2 == 'ขว') || (l2 == 'ขร') || (l2 == 'ขล') || (l2 == 'ทร') || 
										(l2 == 'ศร') || (l2 == 'สร') || (l2 == 'ษร') || (l2 == 'ซร')) {
										buffer += s[i];
										console.log("buffer-1="+buffer);
									} else {
										buffer = buffer.substr(0, buffer.length - 1);
										console.log("buffer-2="+buffer);
										out.push(buffer);
										buffer = l2.substr(l2.length - 1, 1) + lpatch + s[i];
										console.log("buffer-3="+buffer);
									}
								} else {
									buffer += s[i];
								}
							} else {
								buffer += s[i];
							}
						}
					}
				}
			}
			if (buffer != '') {
				out.push(buffer);
			}
			return out;
		},
		toThai : function(st) {
			var reg = new RegExp();
			var sa = this.segment(st);
			var out = [];
			for (var i = 0; i < sa.length; i++)
			{
				console.log('Segment:'+sa[i]);
				var s = this.prune(sa[i]);
				for (m in this.mapS2T) {
					reg.compile(m, 'g');
					s = s.replace(reg, this.mapS2T[m]);
				}
				s = this.postprocess(s);
				out.push(s);
			}
			return out.join('');
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
