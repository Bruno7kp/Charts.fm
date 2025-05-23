const en = {
    chart: {
        abbr: {
            cr: 'CR',
            pr: 'PR',
            pk: 'PK',
            cp: 'CP',
            pp: 'PP',
            to: 'TO',
            re: 'RE',
            ne: 'NE',
        },
        current_rank: 'Current Rank',
        previous_rank: 'Previous Rank',
        current_playcount: 'Current Playcount',
        previous_playcount: 'Previous Playcount',
        peak: 'Peak',
        debut: 'Debut',
        chart_points: 'Chart Points',
        total_playcount: 'Total Playcount (while on the chart)',
        rank: 'Rank',
        plays: 'Plays',
        playcount: 'Playcount',
        goto: 'Go to chart',
        update: 'Update Charts',
        update_now: 'NEW UPDATE!',
        weekly: 'Weekly Charts',
        total_week: 'Total Weeks on Chart',
        re_entry: 'Re-entry',
        new_entry: 'New Entry',
        no_variation: 'No Variation',
        week_day: 'Week Day',
        start_date: 'Start Date',
        loading: 'Loading',
        table: 'Table Settings',
        show_cols: 'Show Columns',
        variation: 'Rank / Playcount Variation',
        table_style: 'Table Style',
        previous: 'Previous Value',
        diff: 'Difference',
        percent: 'Percent',
        compact: 'Compact',
        striped: 'Striped',
        border: 'Border',
        hover: 'Hover',
        color: 'Color Variation',
        times: 'Times at #1',
        line: 'Row Separator',
        top: 'Top',
        show_dropouts: 'Show dropouts',
        dropout: 'Drop outs',
        out: 'Out',
        untie: 'Adjust tied positions',
        untie_description: 'Drag to change the tied positions based on play counts',
    },
    lastfm: {
        username: 'Enter your last.fm username',
    },
    messages: {
        first_week: 'First chart done!',
        first_week_sub: 'Attention: While loading, the page may suffer slowly,' +
        ' you may already browse your charts, but we recommend wait until loading is complete.',
        settings_warning: 'If you change your settings, your data will be reset.',
        settings_updated: 'Settings updated successfully.',
        images_removed: 'Images removed from cache.',
        remove_images: 'Remove images from cache',
        weeks_loaded: 'weeks loaded',
        update_complete: 'Update completed!',
        update_complete_sub: 'Click the button with two arrows to the right to see the most recent chart.',
        error: 'Oops, something went wrong.',
        error_connection: 'Make sure you are connected to the internet and try again.',
        limit_warning: 'High limit number can affect site performance. Recommended: between 20 and 40.',
        zero_warning: 'Enter 0 to include everything without limitations.',
        confirm: 'Are you sure?',
        privacy: 'Privacy Policy',
        intro: 'Create your weekly charts based on what you listen to on Last.fm',
        read_more: 'Read more',
        view_more: 'View more',
        require_update: 'Update required',
        untie_complete: 'Chart updated!',
        untie_complete_sub: 'The page will refresh so that the changes take effect on your chart.',
        may_update: 'May update',
    },
    word: {
        album: 'Album | Albums',
        artist: 'Artist | Artists',
        continue: 'Continue',
        forum: 'Forum',
        image: 'Image',
        language: 'Language',
        legend: 'Legend',
        limit: 'Number of Tracks',
        update: 'Update',
        updates: 'Updates',
        remove: 'Remove',
        save: 'Save',
        cancel: 'Cancel',
        separate: 'Separate',
        settings: 'Settings',
        timezone: 'Timezone',
        title: 'Title',
        title_artist: 'Title, Artist',
        track: 'Track | Tracks',
        user: 'User | Users',
        week: 'Week | Weeks',
        sunday: 'Sunday',
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday',
        theme: 'Theme',
        action: 'Action | Actions',
        share: 'Share',
        new: 'New',
        publicity: 'Ads',
        year: 'Year | Years',
        all_time: 'All Time',
        view_week: 'View Week',
    },
    blog: {
        first_stats_update: {
            title: 'First stats update',
            content: 'Its been a long time... <br/>The first two statistics have been added to Charts.fm:<br/> The list of all #1s and the list of those that stayed at #1 for the most weeks.<br/>I plan to bring more features from now on, with at least one update per month.<br><br>See you!',
            date: '2025-04-18',
        },
        dropouts_and_rank_unties: {
            title: 'Editing tied songs and chart dropouts',
            content: 'One of the most requested features from ZeroCharts is now on Charts.fm:<br/>Editing tied positions of songs/albums/artists. At the end of the weekly chart table, there is now a button called \'Adjust tied positions\', clicking it will show you the chart editing screen. Just drag the tied songs and adjust the chart as you wish. ;)<br/><br/><img src="/img/untie.png" alt="Untie" style="border: 3px solid gray; width: 100%;"><br/><br/>Another feature added is the ability to show the songs that were present in the previous week and dropped out this week. You can enable or disable this option in the table settings.<br/><br/><img src="/img/dropout.png" style="border: 3px solid gray; width: 100%" alt="dropout">',
            date: '2025-04-23',
        },
    },
    stats: {
        more: 'More stats coming soon...',
        number_xs: 'All #{number}s',
        number_ones: {
            title: 'All #1s',
            content: ' View the full list of artists, albums, and tracks that reached the top spot (or positions like #2, #3, etc.) on your weekly chart.',
        },
        allkill: {
            title: 'Perfect All Kill',
            content: 'Artists who dominated the week by simultaneously holding #1 on all three charts: artist, album, and track.',
        },
        most_number_xs: 'Most weeks at #{number}',
        most_number_ones: {
            title: 'Most Weeks at #1',
            content: 'See which artists, albums, and tracks stayed at the top for the most weeks.',
        },
        most_top_xs: 'Most weeks in the top {number}',
        most_weeks: {
            title: 'Longest Charting',
            content: ' Explore the artists, albums, and tracks that spent the most time on your weekly chart.',
        },
        include_only_peak_at: 'Show only those that peaked at #{number}',
        most_plays: {
            title: 'Most Plays',
            content: 'Check out the artists, albums, and tracks you listened to the most in a single week.',
        },
        debut: {
            title: 'Biggest Debuts',
            content: 'Find out which artists, albums, and tracks had the strongest debut weeks on your charts.',
        },
        points: {
            title: 'Most Chart Points',
            content: 'Discover the most consistent performers who racked up the most points over time.',
        },
        artist_tracks: {
            title: 'Artists with Most #1s',
            content: ' See which artists topped your charts the most with their albums and tracks.',
        },
    },
};

export default en;
