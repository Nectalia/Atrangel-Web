    $(document).ready(function() {
        // ページ表示時に、URLに#がついていても一番上に強制スクロール
        if (window.location.hash) {
            $(window).scrollTop(0);
        }
        $(window).scrollTop(0);

    var backgrounds = [".background1", ".background2", ".background3", ".background4"];
    var currentIndex = 0;

    // 最初の背景を表示
    $(backgrounds[currentIndex]).fadeIn(1000);

    // 5秒毎に画像を切り替える処理
    setInterval(function() {
        // 現在の背景をフェードアウト
        $(backgrounds[currentIndex]).fadeOut(3000);

        // 次の背景インデックスを計算（ループ処理）
        currentIndex = (currentIndex + 1) % backgrounds.length;

        // 次の背景をフェードイン
        $(backgrounds[currentIndex]).fadeIn(1000);
    }, 10000); // 5秒毎に切り替え


        // スクロールを無効にする
        $('body').css('overflow', 'hidden');

        setTimeout(function() {
            $('#top .overlay').fadeOut(3000, function() {
                // スクロールを有効にする
                $('body').css('overflow', '');
            });
        }, 1000);

        // 自動でメニューを閉じるためのタイマー変数
        let menuCloseTimer;

        // メニューを開閉する関数
        function toggleMenu() {
            // メニューのリスト項目をスライドで開閉（MENU以外の項目）
            $('#header ul li:not(:first-child)').slideToggle(300);

            // メニューが開いたら5秒後に自動で閉じる
            resetMenuCloseTimer();
        }

        // タイマーをリセットする関数
        function resetMenuCloseTimer() {
            // 既存のタイマーがある場合はクリア
            if (menuCloseTimer) {
                clearTimeout(menuCloseTimer);
            }

            // 新しいタイマーを設定（5秒後に自動でメニューを閉じる）
            menuCloseTimer = setTimeout(function() {
                $('#header ul li:not(:first-child)').slideUp(300); // メニューを閉じる
            }, 5000); // 5000ms = 5秒
        }

        // メニューの開閉処理
        $('#header ul li:first-child').on('click', function() {
            toggleMenu();
        });

        // ページ内リンクのクリック時のスクロールアニメーション
        $('#header ul li a,.content_live .wrap p a').on('click', function(e) {
            // デフォルトのリンク動作を無効化
            e.preventDefault();

            // 移動先のターゲットIDを取得
            var target = $(this).attr('href');
            
            // ターゲットが存在する場合にスクロールアニメーションを実行
            if ($(target).length) {
                $('html, body').animate({
                    scrollTop: $(target).offset().top
                }, 350);  // 1000ms（1秒）でスクロール
            }

            // メニューを閉じるタイマーをリセット
            resetMenuCloseTimer();
        });

        // MOREボタンがクリックされた時のイベント
        $('.memberBox a').on('click', function(e) {
            e.preventDefault(); // デフォルトのリンク動作をキャンセル

            // クリックされたリンクのhref属性を取得
            var imgSrc = $(this).attr('href');

            // モーダルに画像を表示
            $('#modalImage').attr('src', imgSrc);

            // モーダルを表示
            $('#modal').fadeIn(300);
        });

        // モーダルを閉じる処理
        $('.close').on('click', function() {
            $('#modal').fadeOut(300);
        });

        // モーダル領域外をクリックした場合に閉じる
        $(window).on('click', function(e) {
            if ($(e.target).is('#modal')) {
                $('#modal').fadeOut(300);
            }
        });


        $('#contactForm').on('submit', function(event) {
            // エラーメッセージをクリア
            $('.error-message').remove();
            
            // 入力チェック用のフラグ
            let isValid = true;

            // 名前のバリデーション
            if ($('#name').val().trim() === '') {
                isValid = false;
                $('#name').after('<span class="error-message" style="color:red;">お名前を入力してください。</span>');
            }

            // メールアドレスのバリデーション
            let email = $('#email').val().trim();
            if (email === '') {
                isValid = false;
                $('#email').after('<span class="error-message" style="color:red;">メールアドレスを入力してください。</span>');
            } else if (!validateEmail(email)) {
                isValid = false;
                $('#email').after('<span class="error-message" style="color:red;">正しいメールアドレスを入力してください。</span>');
            }

            // メッセージのバリデーション
            if ($('#message').val().trim() === '') {
                isValid = false;
                $('#message').after('<span class="error-message" style="color:red;">お問い合わせ内容を入力してください。</span>');
            }

            // 無効な場合は送信を中止
            if (!isValid) {
                event.preventDefault();
            }
        });

        // メールアドレスのフォーマットチェック用関数
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

    });
