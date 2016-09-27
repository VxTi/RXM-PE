var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var menu;
var menu2;
var menu3;
var menu4;
var menu5;
var btn;
var menuBtn;
var notifyMenu;
var menuState = "none";
var notifyState = false;

var modDir = android.os.Environment.getExternalStorageDirectory() + "/RxM/";

var menuX = ctx.getWindowManager().getDefaultDisplay().getWidth() / 1.52;
var menuY = android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT;
var menuY2 = ctx.getWindowManager().getDefaultDisplay().getHeight() / 1.3 / 1.16;

// DRAWING BUTTONS / MENUS
var linebg = new android.graphics.drawable.GradientDrawable();
linebg.setShape(android.graphics.drawable.GradientDrawable.LINE);
linebg.setColor(android.graphics.Color.argb(200, 0, 0, 0));
linebg.setStroke(dip2px(2), android.graphics.Color.rgb(0, 175, 175));

var menubg = new android.graphics.drawable.GradientDrawable();
menubg.setColor(android.graphics.Color.argb(200, 20, 20, 20));
menubg.setStroke(dip2px(2), android.graphics.Color.rgb(0, 175, 175));
menubg.setCornerRadius(dip2px(2));

var draw_module_on = new android.graphics.drawable.GradientDrawable();
draw_module_on.setColor(android.graphics.Color.argb(160, 0, 175, 175)); 
draw_module_on.setCornerRadius(dip2px(2));
draw_module_on.setStroke(dip2px(2), android.graphics.Color.rgb(0, 0, 0));

var draw_module_off = new android.graphics.drawable.GradientDrawable();
draw_module_off.setCornerRadius(dip2px(2)); 
draw_module_off.setStroke(dip2px(2), android.graphics.Color.rgb(0, 0, 0));
draw_module_off.setColor(android.graphics.Color.argb(160, 0, 0, 0)); 

var draw_module_special = new android.graphics.drawable.GradientDrawable();
draw_module_special.setCornerRadius(dip2px(2));
draw_module_special.setStroke(dip2px(2), android.graphics.Color.rgb(0, 0, 0));
draw_module_special.setColor(android.graphics.Color.argb(160, 0, 115, 115));
// 


var font = android.os.Build.VERSION.SDK_INT >= 17 ? android.graphics.Typeface.create("sans-serif-light", android.graphics.Typeface.NORMAL) : android.graphics.Typeface.DEFAULT;
function dip2px(dips) {
    var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
    return Math.ceil(dips * ctx.getResources()
        .getDisplayMetrics()
        .density);
}
const currentVersion = "0.2";
var newVersion; 
var releaseNotes = "";
RXM.getModVersion = function() {
    try {
        var url = new java.net.URL("https://raw.githubusercontent.com/VxTi/RXM-PE/master/RXM-version");
        var connection = url.openConnection();
        inputStream = connection.getInputStream();
        var loadedVersion = "";
        var bufferedVersionReader = new java.io.BufferedReader(new java.io.InputStreamReader(inputStream));
        var rowVersion = "";
        while((rowVersion = bufferedVersionReader.readLine()) != null) {
            loadedVersion += rowVersion;
        }
        newVersion = loadedVersion.split(":")[0];
        releaseNotes = loadedVersion.split(":")[1];
        bufferedVersionReader.close();;
    } catch(err) {
        notifymsg("Error: Can't check for updates, Please check your internet connection.");
    } 
}
function showButton() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var layout = new android.widget.LinearLayout(ctx);
                layout.setOrientation(1);
                
                menuBtn = new android.widget.Button(ctx);
                var bg2 = new android.graphics.drawable.GradientDrawable();
                bg2.setCornerRadius(dip2px(25));
                
                bg2.setStroke(dip2px(2), android.graphics.Color.rgb(0, 0, 0));
                bg2.setColor(android.graphics.Color.argb(160, 20, 20, 20));
                menuBtn.setTypeface(font);
                menuBtn.setTextSize(dip2px(6))
                menuBtn.setTransformationMethod(null);
                menuBtn.setText(Texts.General.modTitle);
                menuBtn.setTextColor(android.graphics.Color.WHITE); 
                menuBtn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function() {
                        switch (menuState) {
                            case "friends_gui":
                            clickGui();
                            menu5.dismiss();
                            menu5 = null;
                            menuState = "clickgui";
                            break;
                            case "none":
                            clickGui();
                            menuState = "clickgui";
                            break;
                            case "aimbot_gui":
                            menu3.dismiss();
                            menu3 = null;
                            clickGui();
                            menuState = "clickgui";
                            break;
                            case "step_gui":
                            menuState = "clickgui";
                            menu4.dismiss();
                            menu4 = null;
                            clickGui();
                            break;
                            case "speed_gui":
                            menu2.dismiss();
                            menu2 = null;
                            clickGui();
                            menuState = "clickgui";
                            break;
                            case "clickgui":
                            menuState = "none";
                            menu.dismiss();
                            menu = null;
                            break;
                        }
                    }
                }));
                layout.addView(menuBtn, 105, 105);
                menuBtn.setBackgroundDrawable(bg2);
                btn = new android.widget.PopupWindow(layout,android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT,android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                btn.showAtLocation(ctx.getWindow().getDecorView(),android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM, 90, 0);
            } catch(err) {
                notify("Error", err);
                
            }
        }
    }));
}
showButton();


var Texts = {
    General: {
        modTitle: "RxM"
    },
    clickGui: {
        Speed: "Speed Settings",
        Modules: "Modules",
        Aimbot: "Aimbot Settings",
        Step: "Step Settings",
        Friends: "Friends",
        Gamemode: function() {
            if (Level.getGameMode() == -1) return "Gamemode - Unknown";
            if (Level.getGameMode() == 0) return "Gamemode - Survival";
            if (Level.getGameMode() == 1) return "Gamemode - Creative";
        },
    }
}
function notify(title, message) {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                if (notifyState) return; 
                notifyState = true; 
                var notifyLayout = new android.widget.LinearLayout(ctx);
                notifyLayout.setOrientation(1);
                var bg = new android.graphics.drawable.GradientDrawable();
                bg.setColor(android.graphics.Color.argb(250, 250, 250, 250));
                bg.setCornerRadius(dip2px(2));
                bg.setStroke(dip2px(2), android.graphics.Color.argb(250, 0, 0, 0));
                var notifyText = new android.widget.TextView(ctx);
                notifyText.setText(title + "\n" + message);
                notifyText.setTypeface(font);
                notifyText.setTextColor(android.graphics.Color.BLACK);
                notifyText.setTextSize(dip2px(7));
                notifyText.setGravity(android.view.Gravity.CENTER);
                notifyText.setBackgroundDrawable(bg);
                notifyLayout.addView(notifyText);
                var notifyBtn = new android.widget.Button(ctx);
                notifyBtn.setText("Okay");
                notifyBtn.setTextSize(dip2px(7));
                notifyBtn.setTypeface(font);
                notifyBtn.setTextColor(android.graphics.Color.BLACK);
                notifyBtn.setBackgroundColor(android.graphics.Color.WHITE);
                notifyBtn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function() {
                        notifyMenu.dismiss();
                        notifyState = false; 
                        notifyMenu = null;
                    }
                }))
                notifyLayout.addView(notifyBtn);

                notifyMenu = new android.widget.PopupWindow(notifyLayout, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                notifyMenu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.CENTER, 0, 0);
                notifyMenu.setAnimationStyle(android.R.style.Animation_Dialog);
            } catch(e) {
                print(e);
                
            }
        }
    }));
}
function notifymsg(message) {
    clientMessage(ChatColor.DARK_GRAY + "[" + ChatColor.RED + Texts.General.modTitle + ChatColor.DARK_GRAY + "]" + ChatColor.GRAY + ": " + message);
}

var Blocks = {
    isLiquid: function (id) {
        if(id >= 8 && id <= 11) return true;
        return false;
    }
}

var target = [true, true, false]; 
var Players = {
    Friends: {
        All: new org.json.JSONArray(),
        addFriend: function(name) {
            Players.Friends.All.push(name);
            Players.Friends.saveToFile();
        },
        isFriend: function (name) {
            var is = false;
            if(name == null) return false;
            var cname = Players.cleanText(name.toString().toLowerCase());
            for(var i = 0; i < Players.Friends.All.length(); i++) {
                if(cname.toString().toLowerCase() == Players.Friends.All.getString(i).toLowerCase()) is = true;
            }
            return is;
        },
        loadFromFile: function() {
            try {
                var file = new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/RxM/", "friends.dat");
                var readed = (new java.io.BufferedReader(new java.io.FileReader(file)));
                var data = new java.lang.StringBuilder();
                var string;
                while((string = readed.readLine()) != null) {
                    data.append(string);
                }
                try {
                    Players.Friends.All = new org.json.JSONArray(data.toString());
                } catch(e) {
                    notify("friends.dat file corrupted!");
                }
            } catch(e) {
            notify("friends.dat file does not exist!");
            }
        },
        saveToFile: function () {
            var dir = new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/RxM");
            if(!dir.exists()) dir.mkdir();
            var file = new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/RxM/", "friends.dat");
            if(!file.exists()) file.createNewFile();
            var stream = new java.io.FileOutputStream(file);
            try {
                stream.write(Players.Friends.All.toString().getBytes());
            } finally {
                stream.close();
            }
        },
        addFriend: function (name) {
            Players.Friends.All.put(name);
            Players.Friends.saveToFile();
        },
        removeFriend: function (name) {
            var tempall = new org.json.JSONArray();
            for(var i = 0; i < Players.Friends.All.length(); i++) {
                if(Players.Friends.All.getString(i).toLowerCase() != name.toString().toLowerCase()) tempall.put(Players.Friends.All.getString(i));
                }
            Players.Friends.All = tempall;
            Players.Friends.saveToFile();
        }
    },
    cleanText: function (text) {
        var allColor = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "k", "l", "m", "n", "o", "r"];
        if(text != null) {
            allColor.forEach(function (entry) {
                text = text.replace(new RegExp("\u00A7" + entry, 'g'), "");
            });
            return text;
        } else
            return "";
    },
    setVelocity: function(x, y, z) {
        Entity.setVelX(getPlayerEnt(), x);
        Entity.setVelY(getPlayerEnt(), y);
        Entity.setVelZ(getPlayerEnt(), z);
    },
    calculateSpeed: function () {
        return Math.sqrt(Math.pow(Entity.getVelX(getPlayerEnt()), 2) + Math.pow(Entity.getVelZ(getPlayerEnt()), 2));
    },
    onGround: function () {
        var y = getPlayerY();
        while(y > 1) y -= 1;
        if((Math.round(y * 100) >= 61 && Math.round(y * 100) <= 63) && getTile(getPlayerX(), getPlayerY() - 1.65, getPlayerZ()) != 0 && !Blocks.isLiquid(getTile(getPlayerX(), getPlayerY() - 1.65, getPlayerZ()))) return true;
        if((Math.round(y * 100) >= 11 && Math.round(y * 100) <= 13) && getTile(getPlayerX(), getPlayerY() - 1.65, getPlayerZ()) != 0 && !Blocks.isLiquid(getTile(getPlayerX(), getPlayerY() - 1.65, getPlayerZ()))) return true;
        return false;
    },
    isCollidedHorizontally: function() {
        var x = getPlayerX();
        var z = getPlayerZ();
        var blockX = Math.round(x - 0.5);
        var blockZ = Math.round(z - 0.5);
        while(x < 1) x += 1;
        while(z < 1) z += 1;
        while(x > 1) x -= 1;
        while(z > 1) z -= 1;
        if(Math.round(x * 100) == 31) x -= 0.01;
        if(Math.round(z * 100) == 31) z -= 0.01;
        if(Math.round(x * 100) == 69) x += 0.01;
        if(Math.round(z * 100) == 69) z += 0.01;
        if(Math.round(x * 100) == 30) blockX--;
        if(Math.round(z * 100) == 30) blockZ--;
        if(Math.round(x * 100) == 70) blockX++;
        if(Math.round(z * 100) == 70) blockZ++;
        if(getTile(blockX, getPlayerY(), blockZ) == 0 && getTile(blockX, getPlayerY() - 1, blockZ) == 0) return false;
        if(Block.getDestroyTime(getTile(blockX, getPlayerY() - 1, blockZ)) <= 0.1 && Block.getDestroyTime(getTile(blockX, getPlayerY(), blockZ)) <= 0.1) return false;
        if(Math.round(x * 100) == 30 || Math.round(x * 100) == 70) return true;
        if(Math.round(z * 100) == 30 || Math.round(z * 100) == 70) return true;
        return false;
    },
    lookAt: function(ent, pos) {
        if(ent != null) {
            var x = Entity.getX(ent) - getPlayerX();
            var y = Entity.getY(ent) - getPlayerY();
            var z = Entity.getZ(ent) - getPlayerZ();
            if(pos != null && pos instanceof Array) {
                x = Entity.getX(ent) - pos[0];
                y = Entity.getY(ent) - pos[1];
                z = Entity.getZ(ent) - pos[2];
            }
            if(Entity.getEntityTypeId(ent) != 63) {
                y += 0.5;
            }
            var a = 0.5 + Entity.getX(ent);
            var b = Entity.getY(ent);
            var c = 0.5 + Entity.getZ(ent);
            var len = Math.sqrt(x * x + y * y + z * z);
            var y = y / len;
            var pitch = Math.asin(y);
            pitch = pitch * 180.0 / Math.PI;
            pitch = -pitch;
            var yaw = -Math.atan2(a - (getPlayerX() + 0.5), c - (getPlayerZ() + 0.5)) * (180 / Math.PI);
            if(pitch < 89 && pitch > -89) {
                Entity.setRot(getPlayerEnt(), yaw, pitch);
            }
        }
    },
    getNearestEntity: function(input) {
        var mobs = Entity.getAll();
        var players = Server.getAllPlayers();
        var range = input;
        var ent = null;
        mobs.forEach(function (entry) {
            var x = Entity.getX(entry) - getPlayerX();
            var y = Entity.getY(entry) - getPlayerY();
            var z = Entity.getZ(entry) - getPlayerZ();
            var distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
            var allowed = false;
            if(target[1] == true && Entity.getEntityTypeId(entry) == 63) allowed = true;
            if(target[0] == true && Entity.getEntityTypeId(entry) < 63) allowed = true;
            if(distance < range && distance > 0 && allowed == true && Entity.getHealth(entry) > 0) {
                if(Entity.getNameTag(entry) == "" || Players.Friends.isFriend(Entity.getNameTag(entry)) == false) {
                    range = distance;
                    ent = entry;
                }
            }
        });
        for(var i = 0; i < players.length; i++) {
            var x = Entity.getX(players[i]) - getPlayerX();
            var y = Entity.getY(players[i]) - getPlayerY();
            var z = Entity.getZ(players[i]) - getPlayerZ();
            var allowed = false;
            if(target[1] == true && Entity.getEntityTypeId(players[i]) == 63) allowed = true;
            if(target[0] == true && Entity.getEntityTypeId(players[i]) < 63) allowed = true;
            if(target[2] == false && Players.Friends.isFriend(Entity.getNameTag(players[i])) == true) allowed = false;
            var distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
            if(distance < range && distance > 0 && allowed == true && Entity.getHealth(players[i]) >= 1) {
                range = distance;
                ent = players[i];
            }
        }
        return ent;
    },
    isOnline: function(name) {
        var players = Server.getAllPlayers();
        for (i = 0; i < players.length; i++) {
            if (Entity.getNameTag(players[i]).toLowerCase() == name) {
                return true;
            }
            return false;
        } 
    }
}
Players.Friends.loadFromFile();


function chatHook(string) {
    if (string.charAt(0) == "-") {
        var c = string.toLowerCase().split(" ");
        var c2 = string.split(" ");
        preventDefault();
        switch (c[0]) {
            case "-changelog":
            if (c[1]) return;
            clientMessage(ChatColor.BLUE + "[CHANGELOG]: " + ChatColor.GRAY + releaseNotes);
            break;
            case "-friends":
            case "-f":
            case "-friend":
            switch (c[1]) {
                case "add":
                if (!c[2] || c[2].length > 16 || c[2] == "" || c[2].length < 3) {
                    notifymsg("Usage: -friend add <username>");
                } else if (Players.Friends.isFriend(c[2]) == true) {
                    notifymsg("Error: This user was already on your friend list.");
                } else {
                    Players.Friends.addFriend(c2[2]);
                    notifymsg("Successfully added " + ChatColor.RED +  c2[2] + ChatColor.GRAY + " to your friend list.");
                }
                break;
                case "del":
                case "delete":
                case "remove":
                if (!c[2] || c[2].length > 16) {
                    notifymsg("Usage: -friend del <username>");
                } else if (Players.Friends.isFriend(c[2]) == false) {
                    notifymsg("Error: This user is not on your friend list");
                } else {
                    Players.Friends.removeFriend(c[2]);
                    notifymsg("Successfully removed " + ChatColor.RED + c2[2] + ChatColor.GRAY + " from your friend list.");
                }
                break;
                case "list":
                case "l":
                if (c[2]) {
                    notifymsg("Error: Invalid arguments: " + c[2]);
                } else {
                    clientMessage(ChatColor.GRAY + "Your friends [" + Players.Friends.All.length() + "]: " + ChatColor.RESET + Players.Friends.All.join(", "));
                }
                break;
            }
            break;
            default:
            notifymsg("Error: Unknown command.");
        }
    }
}
var mods = {
    activate: function() {
        mods.Phase.g();
        mods.NoSlowDown.g();
        mods.Reach.g();
        mods.Aimbot.g();
        mods.Velocity.g();
        mods.Speed.g();
        mods.Glide.g();
        mods.Step.g();
    },
    Velocity: {
        store: null, 
        tick: 0,
        state: false,
        g: function() {
            if (mods.Velocity.state) {
                if(Entity.getHealth(getPlayerEnt()) <= 0) return;
                if(mods.Velocity.tick > 0) {
                    mods.Velocity.tick--;
                } else {
                    Entity.setImmobile(getPlayerEnt(), false);
                }
                if(mods.Velocity.store > Entity.getHealth(getPlayerEnt())){
                    Entity.setImmobile(getPlayerEnt(), true);
                    Entity.setVelY(getPlayerEnt(), -0.05);
                    mods.Velocity.tick = 5;
                }
            mods.Velocity.store = Entity.getHealth(getPlayerEnt());
            }
        }
    },
    NoSlowDown: {
        state: false, 
        webstate: false,  
        g: function() {
            if (mods.NoSlowDown.state) {
                if (getTile(Math.round(getPlayerX() - 0.5), Math.round(getPlayerY() - 1.62), Math.round(getPlayerZ() - 0.5)) == 8 || getTile(Math.round(getPlayerX() - 0.5), Math.round(getPlayerY() - 0.62), Math.round(getPlayerZ() - 0.5)) == 8 || getTile(Math.round(getPlayerX() - 0.5), Math.round(getPlayerY() - 1.62), Math.round(getPlayerZ() - 0.5)) == 9 || getTile(Math.round(getPlayerX() - 0.5), Math.round(getPlayerY() - 0.62), Math.round(getPlayerZ() - 0.5)) == 9) {
                    if (Players.calculateSpeed > 0.025) {
                        var vector = new Array();
                        var yaw = (getYaw(getPlayerEnt()) + 90) * (Math.PI / 180);
                        var pitch = 0;
                        vector[0] = Math.cos(yaw) * Math.cos(pitch);
                        vector[2] = Math.sin(yaw) * Math.cos(pitch);
                        vector[0] = vector[0] / 2.5;
                        vector[2] = vector[2] / 2.5;
                        Players.setVelocity(vector[0], 0, vector[2]);
                    }
                }
                if (getTile(Math.round(getPlayerX() - 0.5), Math.round(getPlayerY() - 1.62), Math.round(getPlayerZ() - 0.5)) == 30 || getTile(Math.round(getPlayerX() - 0.5), Math.round(getPlayerY() - 0.62), Math.round(getPlayerZ() - 0.5)) == 30) {
                    if (!mods.NoSlowDown.webstate) {
                        var xyz = [getPlayerX(), getPlayerY(), getPlayerZ()];
                        mods.NoSlowDown.webstate = true;
                        Entity.setCollisionSize(getPlayerEnt(), 0, 0);
                        setPosition(getPlayerEnt(), xyz[0], xyz[1], xyz[2]);        
                    }
                } else if (mods.NoSlowDown.webstate) {
                    var xyz = [getPlayerX(), getPlayerY(), getPlayerZ()];
                    Entity.setCollisionSize(getPlayerEnt(), 0.6, 1.8);
                    mods.NoSlowDown.webstate = false; 
                    setPosition(getPlayerEnt(), xyz[0], xyz[1], xyz[2]);
                }
            }
        }
    },
    Aimbot: {
        state: false,
        range: 8,
        g: function() {
            if (mods.Aimbot.state) {
                try {
                    var ent;
                    ent = Players.getNearestEntity(mods.Aimbot.range);
                } catch(e) {
                    notify(e);
                }
                if (ent != null) {
                    Players.lookAt(ent);
                }
            }
        }
    },
    Reach: {
        state: false,
        g: function() {
            if (mods.Reach.state) {
                if (Level.getGameMode() == 0) Level.setGameMode(1);
            }
        }
    },
    Glide: {
        state: false,
        g: function() {
            if (mods.Glide.state) {
                if (getTile(getPlayerX(), getPlayerY() - 1.65, getPlayerZ()) == 0 && Entity.getVelY(getPlayerEnt()) < 0) Entity.setVelY(getPlayerEnt(), -0.01);
            }
        }
    },
    Phase: {
        state: false, 
        g: function() {
            if (mods.Phase.state) {
                if (Entity.isSneaking(getPlayerEnt())) {
                    var vector = new Array();
                    var yaw = (getYaw(getPlayerEnt()) + 90) * (Math.PI / 180);
                    var pitch = 0;
                    vector[0] = Math.cos(yaw) * Math.cos(pitch);
                    vector[2] = Math.sin(yaw) * Math.cos(pitch);
                    vector[0] = vector[0] / 1.5;
                    vector[2] = vector[2] / 1.5;
                    setPositionRelative(getPlayerEnt(), vector[0], 0, vector[2]);
                    Entity.setSneaking(getPlayerEnt(), false); 
                }
            }
        }
    },
    Step: {
        state: false,
        mode: "Teleport",
        switchMode: function() {
            switch (mods.Step.mode) {
                case "Teleport":
                mods.Step.mode = "Velocity";
                break;
                case "Velocity":
                mods.Step.mode = "Clip";
                break;
                case "Clip":
                mods.Step.mode = "Teleport"
                break;
            }
        },
        g: function() {
            if (mods.Step.state) {
                var clipping = false;
                if (Players.isCollidedHorizontally()) {
                    if(mods.Step.mode == "Velocity") Entity.setVelY(getPlayerEnt(), 0.425);
                    if(mods.Step.mode == "Teleport") {
                        Entity.setPositionRelative(getPlayerEnt(), 0, 1.6, 0);
                        Entity.setVelY(getPlayerEnt(), 0.05);
                    }
                    if (mods.Step.mode == "Clip") {
                        if (!clipping) {
                            clipping = true;
                            var vector = new Array();
                            var yaw = (getYaw(getPlayerEnt()) + 90) * (Math.PI / 180);
                            var pitch = 0;
                            vector[0] = Math.cos(yaw) * Math.cos(pitch);
                            vector[2] = Math.sin(yaw) * Math.cos(pitch);
                            vector[0] = vector[0] / 4;
                            vector[2] = vector[2] / 4;
                            setPositionRelative(getPlayerEnt(), vector[0], 0, vector[2]);
                        }
                        setPositionRelative(getPlayerEnt(), 0, 1.3, 0);
                    }
                }
                if (!Players.isCollidedHorizontally() && clipping) {
                    clipping = false;
                }
            }
        }
    },
    Speed: {
        state: false,
        tick: 0,
        maxtick: 3,
        mode: "Normal",
        switchMode: function() {
            switch (mods.Speed.mode) {
                case "Normal":
                mods.Speed.mode = "Airmove";
                break;
                case "Airmove":
                mods.Speed.mode = "BHop";
                break;
                case "BHop":
                mods.Speed.mode = "FastHop";
                break;
                case "FastHop":
                mods.Speed.mode = "Normal";
                break;  
            }
        },
        g: function() {
            if (mods.Speed.state) {
                mods.Speed.tick++;
                switch (mods.Speed.mode) {
                    case "Normal":
                    if(mods.Speed.tick > 7) mods.Speed.tick = 0;
                    if(Players.calculateSpeed() > 0.1 && mods.Speed.tick == 0) {
                        var vector = new Array();
                        var yaw = (getYaw(getPlayerEnt()) + 90) * (Math.PI / 180);
                        var pitch = 0;
                        vector[0] = Math.cos(yaw) * Math.cos(pitch);
                        vector[2] = Math.sin(yaw) * Math.cos(pitch);
                        vector[0] = vector[0] / 0.7;
                        vector[2] = vector[2] / 0.7;
                        Entity.setVelX(getPlayerEnt(), vector[0]);
                        Entity.setVelZ(getPlayerEnt(), vector[2]);
                    }
                    break;
                    case "Airmove":
                    if (!Players.onGround()) {
                        if(mods.Speed.tick > mods.Speed.maxtick) mods.Speed.tick = 0;
                        if(Players.calculateSpeed() > 0.1 && mods.Speed.tick == 0) {
                            var vector = new Array();
                            var yaw = (getYaw(getPlayerEnt()) + 90) * (Math.PI / 180);
                            var pitch = 0;
                            vector[0] = Math.cos(yaw) * Math.cos(pitch);
                            vector[2] = Math.sin(yaw) * Math.cos(pitch);
                            vector[0] = vector[0] / 0.7;
                            vector[2] = vector[2] / 0.7;
                            Entity.setVelX(getPlayerEnt(), vector[0]);
                            Entity.setVelZ(getPlayerEnt(), vector[2]);
                        }
                    }
                    break;
                    case "BHop":
                    if (Players.onGround()) {
                        Entity.setVelY(getPlayerEnt(), 0.425);
                    }
                    if (!Players.onGround()) {
                        if(mods.Speed.tick > mods.Speed.maxtick) mods.Speed.tick = 0;
                        if(Players.calculateSpeed() > 0.09 && mods.Speed.tick == 0) {
                            var vector = new Array();
                            var yaw = (getYaw(getPlayerEnt()) + 90) * (Math.PI / 180);
                            var pitch = 0;
                            vector[0] = Math.cos(yaw) * Math.cos(pitch);
                            vector[2] = Math.sin(yaw) * Math.cos(pitch);
                            vector[0] = vector[0] / 0.8;
                            vector[2] = vector[2] / 0.8;
                            Entity.setVelX(getPlayerEnt(), vector[0]);
                            Entity.setVelZ(getPlayerEnt(), vector[2]);
                        }
                    }
                    break;
                    case "FastHop":
                    if (Players.onGround()) {
                        if (Players.isCollidedHorizontally()) {
                            Entity.setVelY(getPlayerEnt(), 0.425); 
                        } else {
                            Entity.setVelY(getPlayerEnt(), 0.2);
                        }
                    }
                    if (!Players.onGround()) {
                        if(mods.Speed.tick > mods.Speed.maxtick) mods.Speed.tick = 0;
                        if(Players.calculateSpeed() > 0.09 && mods.Speed.tick == 0) {
                            var vector = new Array();
                            var yaw = (getYaw(getPlayerEnt()) + 90) * (Math.PI / 180);
                            var pitch = 0;
                            vector[0] = Math.cos(yaw) * Math.cos(pitch);
                            vector[2] = Math.sin(yaw) * Math.cos(pitch);
                            vector[0] = vector[0] / 0.9;
                            vector[2] = vector[2] / 0.9;
                            Entity.setVelX(getPlayerEnt(), vector[0]);
                            Entity.setVelZ(getPlayerEnt(), vector[2]);
                        }
                    }
                    break;
                }
            }
        }
    }
}
function clickGui() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
               

                var line = new android.widget.TextView(ctx);
                line.setText("");
                line.setTextSize(dip2px(2));
                line.setBackground(linebg);
                line.setGravity(android.view.Gravity.CENTER);
                var modules_text = new android.widget.TextView(ctx);
                modules_text.setText(Texts.clickGui.Modules);
                modules_text.setTypeface(font);
                modules_text.setTextColor(android.graphics.Color.WHITE);
                modules_text.setGravity(android.view.Gravity.CENTER);
                modules_text.setTextSize(dip2px(9));
                var gamemode_button = new android.widget.Button(ctx);
                gamemode_button.setTransformationMethod(null);
                gamemode_button.setText(Texts.clickGui.Gamemode());
                gamemode_button.setTypeface(font);
                gamemode_button.setTextSize(dip2px(7));
                gamemode_button.setTextColor(android.graphics.Color.WHITE);
                gamemode_button.setGravity(android.view.Gravity.CENTER)
                gamemode_button.setBackgroundDrawable(draw_module_special);
                gamemode_button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function() {
                        if (Level.getGameMode() == -1) {
                            notify("", "Unable to change gamemode,\nYou are not in a world.");
                        } else {
                            Level.setGameMode(Level.getGameMode() == 0 ? 1 : 0);
                            gamemode_button.setText(Texts.clickGui.Gamemode());
                        }
                    }
                }));
                var velocity_button = new android.widget.Button(ctx);
                velocity_button.setText("Velocity");
                velocity_button.setTransformationMethod(null);
                velocity_button.setTypeface(font);
                velocity_button.setTextSize(dip2px(7));
                velocity_button.setTextColor(android.graphics.Color.WHITE);
                velocity_button.setGravity(android.view.Gravity.CENTER)
                velocity_button.setBackgroundDrawable(mods.Velocity.state == true ? draw_module_on : draw_module_off);
                velocity_button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function() {
                        mods.Velocity.state = !mods.Velocity.state;
                        velocity_button.setBackgroundDrawable(mods.Velocity.state == true ? draw_module_on : draw_module_off);
                    }
                }));

                var phase_button = new android.widget.Button(ctx);
                phase_button.setText("Phase");
                phase_button.setTransformationMethod(null);
                phase_button.setTypeface(font);
                phase_button.setTextSize(dip2px(7));
                phase_button.setTextColor(android.graphics.Color.WHITE);
                phase_button.setGravity(android.view.Gravity.CENTER)
                phase_button.setBackgroundDrawable(mods.Phase.state == true ? draw_module_on : draw_module_off);
                phase_button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function() {
                        mods.Phase.state = !mods.Phase.state;
                        phase_button.setBackgroundDrawable(mods.Phase.state == true ? draw_module_on : draw_module_off);
                    }
                }));
                var reach_button = new android.widget.Button(ctx);
                reach_button.setText("Reach");
                reach_button.setTypeface(font);
                reach_button.setTransformationMethod(null);
                reach_button.setTextSize(dip2px(7));
                reach_button.setTextColor(android.graphics.Color.WHITE);
                reach_button.setGravity(android.view.Gravity.CENTER)
                reach_button.setBackgroundDrawable(mods.Reach.state == true ? draw_module_on : draw_module_off);
                reach_button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function() {
                        mods.Reach.state = !mods.Reach.state;
                        reach_button.setBackgroundDrawable(mods.Reach.state == true ? draw_module_on : draw_module_off);
                    }
                }));
                var glide_button = new android.widget.Button(ctx);
                glide_button.setText("Glide");
                glide_button.setTypeface(font);
                glide_button.setTransformationMethod(null);
                glide_button.setTextSize(dip2px(7));
                glide_button.setTextColor(android.graphics.Color.WHITE);
                glide_button.setGravity(android.view.Gravity.CENTER)
                glide_button.setBackgroundDrawable(mods.Glide.state == true ? draw_module_on : draw_module_off);
                glide_button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function() {
                        mods.Glide.state = !mods.Glide.state;
                        glide_button.setBackgroundDrawable(mods.Glide.state == true ? draw_module_on : draw_module_off);
                    }
                }));

                var noslowdown_button = new android.widget.Button(ctx);
                noslowdown_button.setText("NoSlowDown");
                noslowdown_button.setTypeface(font);
                noslowdown_button.setTransformationMethod(null);
                noslowdown_button.setTextSize(dip2px(7));
                noslowdown_button.setTextColor(android.graphics.Color.WHITE);
                noslowdown_button.setGravity(android.view.Gravity.CENTER)
                noslowdown_button.setBackgroundDrawable(mods.NoSlowDown.state == true ? draw_module_on : draw_module_off);
                noslowdown_button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function() {
                        mods.NoSlowDown.state = !mods.NoSlowDown.state;
                        noslowdown_button.setBackgroundDrawable(mods.NoSlowDown.state == true ? draw_module_on : draw_module_off);
                    }
                }));
                var friends_button = new android.widget.Button(ctx);
                friends_button.setText("Friends - [" + Players.Friends.All.length() + "]");
                friends_button.setTypeface(font);
                friends_button.setTextSize(dip2px(7));
                friends_button.setTransformationMethod(null);
                friends_button.setTextColor(android.graphics.Color.WHITE);
                friends_button.setGravity(android.view.Gravity.CENTER)
                friends_button.setBackgroundDrawable(draw_module_special);
                friends_button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function() {
                        menuState = "friends_gui";
                        menu.dismiss();
                        menu = null;
                        friendsGui();
                    }
                }));

                var step_button = new android.widget.Button(ctx);
                step_button.setText("Step - [" + mods.Step.mode + "]");
                step_button.setTypeface(font);
                step_button.setTextSize(dip2px(7));
                step_button.setTransformationMethod(null);
                step_button.setTextColor(android.graphics.Color.WHITE);
                step_button.setGravity(android.view.Gravity.CENTER)
                step_button.setBackgroundDrawable(mods.Step.state == true ? draw_module_on : draw_module_off);
                step_button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function() {
                        mods.Step.state = !mods.Step.state;
                        step_button.setBackgroundDrawable(mods.Step.state == true ? draw_module_on : draw_module_off);
                    }
                }));
                step_button.setOnLongClickListener(new android.view.View.OnLongClickListener({
                    onLongClick: function(v, t) {
                        menu.dismiss();
                        menu = null;
                        stepGui();
                        menuState = "step_gui";
                        return true;
                    }
                }));

                var aimbot_button = new android.widget.Button(ctx);
                aimbot_button.setText("Aimbot - [" + mods.Aimbot.range + "]");
                aimbot_button.setTypeface(font);
                aimbot_button.setTransformationMethod(null);
                aimbot_button.setTextSize(dip2px(7));
                aimbot_button.setTextColor(android.graphics.Color.WHITE);
                aimbot_button.setGravity(android.view.Gravity.CENTER)
                aimbot_button.setBackgroundDrawable(mods.Aimbot.state == true ? draw_module_on : draw_module_off);
                aimbot_button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function() {
                        mods.Aimbot.state = !mods.Aimbot.state;
                        aimbot_button.setBackgroundDrawable(mods.Aimbot.state == true ? draw_module_on : draw_module_off);
                    }
                }));
                aimbot_button.setOnLongClickListener(new android.view.View.OnLongClickListener({
                    onLongClick: function(v, t) {
                        menuState = "aimbot_gui";
                        menu.dismiss();
                        menu = null;
                        aimbotGui();
                        return true;
                    }
                }));

                var speed_button = new android.widget.Button(ctx);
                speed_button.setText("Speed - [" + mods.Speed.mode + "]");
                speed_button.setTypeface(font);
                speed_button.setTransformationMethod(null);
                speed_button.setTextSize(dip2px(7));
                speed_button.setTextColor(android.graphics.Color.WHITE);
                speed_button.setGravity(android.view.Gravity.CENTER)
                speed_button.setBackgroundDrawable(mods.Speed.state == true ? draw_module_on : draw_module_off);
                speed_button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function() {
                        mods.Speed.state = !mods.Speed.state;
                        speed_button.setBackgroundDrawable(mods.Speed.state == true ? draw_module_on : draw_module_off);
                    }
                }));
                speed_button.setOnLongClickListener(new android.view.View.OnLongClickListener({
                    onLongClick: function(v, t) {
                        menu.dismiss();
                        menu = null;
                        menuState = "speed_gui";
                        speedGui();
                        return true;
                    }
                }));
                

                /// Setting up the GUI.
                var layout = new android.widget.LinearLayout(ctx);   
                layout.setOrientation(1);                            
                layout.addView(modules_text);
                layout.addView(line);
                
                var scr = new android.widget.ScrollView(ctx);
                var scrl = new android.widget.LinearLayout(ctx);
                scrl.setOrientation(1);

                // scrl.addView(id); to add a button in the scroll layout.
                scrl.addView(gamemode_button);
                scrl.addView(friends_button);
                scrl.addView(aimbot_button);
                scrl.addView(speed_button);
                scrl.addView(step_button);
                scrl.addView(velocity_button);
                scrl.addView(reach_button);
                scrl.addView(glide_button);
                scrl.addView(noslowdown_button);    
                scrl.addView(phase_button); 
                scr.addView(scrl);
                
                layout.addView(scr, menuX, menuY2);
                layout.setGravity(android.view.Gravity.CENTER);
                /////////////////////////////////////////

                menu = new android.widget.PopupWindow(layout, ctx.getWindowManager().getDefaultDisplay().getWidth() / 1.5, ctx.getWindowManager().getDefaultDisplay().getHeight() / 1.3);
                menu.setBackgroundDrawable(menubg);
                menu.setAnimationStyle(android.R.style.Animation_Dialog);
                menu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.CENTER, 0, 0);

            } catch(e) {
                notify("Error", e);
                
            }
        }
    }));
}

function friendsGui() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var layout5 = new android.widget.LinearLayout(ctx);
                layout5.setOrientation(1);
                layout5.setGravity(android.view.Gravity.CENTER);

                var line5 = new android.widget.TextView(ctx);
                line5.setText("");
                line5.setBackground(linebg);
                line5.setTextSize(dip2px(2));
                line5.setGravity(android.view.Gravity.CENTER);

                var title = new android.widget.TextView(ctx);
                title.setText(Texts.clickGui.Friends + " [" + Players.Friends.All.length() + "]");
                title.setTypeface(font);
                title.setTextSize(dip2px(9));
                title.setGravity(android.view.Gravity.CENTER);
                title.setTextColor(android.graphics.Color.WHITE);

                var friends_button = new android.widget.TextView(ctx);
                friends_button.setText(Players.Friends.All.join("\n"));
                friends_button.setTypeface(font);
                friends_button.setGravity(android.view.Gravity.CENTER);
                friends_button.setTextSize(dip2px(7));
                friends_button.setTextColor(android.graphics.Color.WHITE);



                var scr = new android.widget.ScrollView(ctx);
                layout5.addView(friends_button);
                scr.addView(layout5);

                var layout = new android.widget.LinearLayout(ctx);
                layout.setOrientation(1);
                layout.addView(title);
                layout.addView(line5);
                layout.addView(scr);


                menu5 = new android.widget.PopupWindow(layout, ctx.getWindowManager().getDefaultDisplay().getWidth() / 1.5, ctx.getWindowManager().getDefaultDisplay().getHeight() / 1.3);
                menu5.setBackgroundDrawable(menubg);
                menu5.setAnimationStyle(android.R.style.Animation_Dialog);
                menu5.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.CENTER, 0, 0);
            } catch(e) {
                notify(e);
            }
        }
    }));
}

function aimbotGui() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var layout3 = new android.widget.LinearLayout(ctx);
                layout3.setOrientation(1);
                var layout32 = new android.widget.LinearLayout(ctx);

                var line3 = new android.widget.TextView(ctx);
                line3.setText("");
                line3.setTextSize(dip2px(2));
                line3.setBackground(linebg);
                line3.setGravity(android.view.Gravity.CENTER);
                var aimbot_text = new android.widget.TextView(ctx);
                aimbot_text.setText(Texts.clickGui.Aimbot);
                aimbot_text.setTypeface(font);
                aimbot_text.setTextColor(android.graphics.Color.WHITE);
                aimbot_text.setGravity(android.view.Gravity.CENTER);
                aimbot_text.setTextSize(dip2px(9));


                var target_text = new android.widget.TextView(ctx);
                target_text.setText("Target:");
                target_text.setTextColor(android.graphics.Color.WHITE);
                target_text.setTextSize(dip2px(7));
                target_text.setGravity(android.view.Gravity.CENTER);
                target_text.setTypeface(font);

                var target_p = new android.widget.CheckBox(ctx);
                target_p.setText("Players");
                target_p.setTypeface(font);
                target_p.setTextColor(android.graphics.Color.WHITE);
                target_p.setChecked(target[1]);
                target_p.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function (v) {
                        target[1] = v.isChecked();
                    }
                }));

                var target_m = new android.widget.CheckBox(ctx);
                target_m.setText("Mobs");
                target_m.setTypeface(font);
                target_m.setTextColor(android.graphics.Color.WHITE);
                target_m.setChecked(target[0]);
                target_m.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function (v) {
                        target[0] = v.isChecked();
                    }
                }));

                var target_f = new android.widget.CheckBox(ctx);
                target_f.setText("Friends");
                target_f.setTypeface(font);
                target_f.setTextColor(android.graphics.Color.WHITE);
                target_f.setChecked(target[2]);
                target_f.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function (v) {
                        target[2] = v.isChecked();
                    }
                }));

                 var range_text = new android.widget.TextView(ctx);
                range_text.setText("Range: " + mods.Aimbot.range);
                range_text.setGravity(android.view.Gravity.CENTER);
                range_text.setTextColor(android.graphics.Color.WHITE);
                range_text.setTextSize(dip2px(9));
                range_text.setTypeface(font);

                var range_slider = new android.widget.SeekBar(ctx);
                range_slider.setMax(20);
                var RANGE_MIN = 3;
                range_slider.setProgress(mods.Aimbot.range);
                range_slider.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
                    onProgressChanged: function (seekBar, progress, fromUser) {
                        if (range_slider.getProgress() < RANGE_MIN) {
                            range_slider.setProgress(RANGE_MIN);
                        } else {
                            range_text.setText("Range: " + range_slider.getProgress());
                        }
                    },
                    onStopTrackingTouch: function (seekbar) {
                        mods.Aimbot.range = seekbar.getProgress();
                    }
                }));


                layout3.addView(aimbot_text);
                layout3.addView(line3);
                layout3.addView(target_text);
                layout3.addView(target_p);
                layout3.addView(target_m);
                layout3.addView(target_f);
                layout3.addView(range_text);
                layout3.addView(range_slider);

                menu3 = new android.widget.PopupWindow(layout3, ctx.getWindowManager().getDefaultDisplay().getWidth() / 1.5, ctx.getWindowManager().getDefaultDisplay().getHeight() / 1.3);
                menu3.setBackgroundDrawable(menubg);
                menu3.setAnimationStyle(android.R.style.Animation_Dialog);
                menu3.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.CENTER, 0, 0);
            } catch(e) {
                notify("Error", e);
            }
        }
    }));
}
function stepGui() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var layout4 = new android.widget.LinearLayout(ctx);
                layout4.setOrientation(1);

                var layout42 = new android.widget.LinearLayout(ctx);
                layout42.setOrientation(1);
                layout42.setGravity(android.view.Gravity.CENTER);

                var line4 = new android.widget.TextView(ctx);
                line4.setText("");
                line4.setTextSize(dip2px(2));

                line4.setBackground(linebg);
                line4.setGravity(android.view.Gravity.CENTER);
                var step_text = new android.widget.TextView(ctx);
                step_text.setText(Texts.clickGui.Step);
                step_text.setTypeface(font);
                step_text.setTextColor(android.graphics.Color.WHITE);
                step_text.setGravity(android.view.Gravity.CENTER);
                step_text.setTextSize(dip2px(9));

                var stepsettings_button = new android.widget.Button(ctx);
                stepsettings_button.setText("Mode - " + mods.Step.mode);
                stepsettings_button.setTypeface(font);
                stepsettings_button.setTransformationMethod(null);
                stepsettings_button.setTextSize(dip2px(7));
                stepsettings_button.setBackgroundDrawable(draw_module_special);
                stepsettings_button.setTextColor(android.graphics.Color.WHITE);
                stepsettings_button.setGravity(android.view.Gravity.CENTER);
                stepsettings_button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function() {
                        mods.Step.switchMode();
                        stepsettings_button.setText("Mode - " + mods.Step.mode);
                    }
                }));

                layout4.addView(step_text);
                layout4.addView(line4);
                layout42.addView(stepsettings_button, menuX, menuY);
                layout4.addView(layout42);

                menu4 = new android.widget.PopupWindow(layout4, ctx.getWindowManager().getDefaultDisplay().getWidth() / 1.5, ctx.getWindowManager().getDefaultDisplay().getHeight() / 1.3);
                menu4.setBackgroundDrawable(menubg);
                menu4.setAnimationStyle(android.R.style.Animation_Dialog);
                menu4.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.CENTER, 0, 0);
            } catch(e) {
                notify("Error", e);
            }
        }
    }));
}
function speedGui() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var layout22 = new android.widget.LinearLayout(ctx);
                layout22.setOrientation(1);
                layout22.setGravity(android.view.Gravity.CENTER);

                var layout2 = new android.widget.LinearLayout(ctx);
                layout2.setOrientation(1);
                var line2 = new android.widget.TextView(ctx);
                line2.setText("");
                line2.setTextSize(dip2px(2));
                line2.setBackground(linebg);
                line2.setGravity(android.view.Gravity.CENTER);
                var speed_text = new android.widget.TextView(ctx);
                speed_text.setText(Texts.clickGui.Speed);
                speed_text.setTypeface(font);
                speed_text.setTextColor(android.graphics.Color.WHITE);
                speed_text.setGravity(android.view.Gravity.CENTER);
                speed_text.setTextSize(dip2px(9));

                var speedsettings_button = new android.widget.Button(ctx);
                speedsettings_button.setText("Mode - " + mods.Speed.mode);
                speedsettings_button.setTypeface(font);
                speedsettings_button.setTransformationMethod(null);
                speedsettings_button.setTextSize(dip2px(7));
                speedsettings_button.setBackgroundDrawable(draw_module_special);
                speedsettings_button.setTextColor(android.graphics.Color.WHITE);
                speedsettings_button.setGravity(android.view.Gravity.CENTER);
                speedsettings_button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function() {
                        mods.Speed.switchMode();
                        speedsettings_button.setText("Mode - " + mods.Speed.mode);
                    }
                }));

                layout2.addView(speed_text);
                layout2.addView(line2);
                layout22.addView(speedsettings_button, menuX, menuY);
                layout2.addView(layout22);
                
                menu2 = new android.widget.PopupWindow(layout2, ctx.getWindowManager().getDefaultDisplay().getWidth() / 1.5, ctx.getWindowManager().getDefaultDisplay().getHeight() / 1.3);
                menu2.setBackgroundDrawable(menubg);
                menu2.setAnimationStyle(android.R.style.Animation_Dialog);
                menu2.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.CENTER, 0, 0);
            } catch(e) {
                notify("Error", e);
            }
        }
    }));
}
var initialized = false;
function modTick() {
    mods.activate();
    if (!initialized) {
        initialized = !initialized;
        RXM.getModVersion();
        if (newVersion != currentVersion && newVersion != undefined) {
            clientMessage(ChatColor.BLUE + "[UPDATE]: " + ChatColor.GRAY + "There is a new update avalable! (" + Texts.General.modTitle + " v" + newVersion + ")");
        } else {
            notifymsg("No new updates avalable.");
        }
    }
}

function attackHook(att, vic) {
    if (mods.Velocity.state && vic == getPlayerEnt()) {
        mods.Velocity.tick = 5;
        Entity.setImmobile(getPlayerEnt(), true);
        Entity.setVelY(getPlayerEnt(), -0.05);
    }
}
