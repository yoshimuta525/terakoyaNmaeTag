
$(function() {
	var canvas = $("#myCanvas")[0];
	var context = canvas.getContext("2d");
            context.imageSmoothingEnabled = false; // スムージングを無効化
            context.scale(8, 8); // 高解像度対応のためのスケーリング
            // CSSでキャンバスの表示サイズを元に戻す
            $("#myCanvas").css({
            	width: "291px",
            	height: "421px"
            });
            var img = new Image();
            // 初期画像を読み込む
            img.src = './name_ver3.png'; // 実際の画像パスを設定してください
            // 初期描画
            function drawInitialImage() {
                context.clearRect(0, 0, canvas.width / 8, canvas.height / 8); // キャンバスをクリア
                if (img.complete) {
                    context.drawImage(img, 0, 0, canvas.width / 8, canvas.height / 8); // 画像をキャンバスに描画
                }
                drawText(); // テキストを描画
                drawQRCode(); // QRコードを描画
            }
            // テキストを描画する関数
            function drawText() {
            	var name = $("#name").val();
            	var skills = $("#skills").val();
            	var hobbies = $("#hobbies").val();
                // 入力されたテキストを描画（画像の上に）
            	context.font = "28px Arial";
            	context.textBaseline = "top";
            	context.fillStyle = "#36455E";
            	context.fillText(name, 80, 188);
            	context.fillText(skills, 80, 237);
            	context.fillText(hobbies, 80, 287);
            }
            // QRコードを描画する関数
            function drawQRCode() {
            	var qrLink = $("#qrLink").val();
            	if (qrLink) {
                    // QRコードを生成して画像オブジェクトに変換する
            		QRCode.toDataURL(qrLink, { width: 60, height: 60 }, function(err, url) {
            			if (!err) {
            				var qrImage = new Image();
            				qrImage.onload = function() {
                                context.drawImage(qrImage, 200, 340, 60, 60); // QRコードをキャンバスに描画
                            };
                            qrImage.src = url;
                        }
                    });
            	}
            }
            // 画像がロードされたら初期描画を実行
            img.onload = function() {
            	drawInitialImage();
            };
            // フォームの入力イベントを監視して再描画
            $("#name, #skills, #hobbies, #qrLink").on("input", drawInitialImage);

            // ダウンロード機能を追加
            $("#downloadBtn").click(function() {
                // キャンバスの内容を画像としてエクスポート
            	var dataURL = canvas.toDataURL("image/png");

                // ダウンロードリンクを作成
            	var downloadLink = document.createElement("a");
            	downloadLink.href = dataURL;
            	downloadLink.download = "nameplate.png";

                // リンクをクリックしてダウンロードを開始
            	document.body.appendChild(downloadLink);
            	downloadLink.click();
            	document.body.removeChild(downloadLink);
            });
        });